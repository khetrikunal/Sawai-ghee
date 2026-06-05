package com.sawai.ghee.controller;

import com.sawai.ghee.dto.*;
import com.sawai.ghee.model.*;
import com.sawai.ghee.repository.*;
import com.sawai.ghee.service.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final ProductVariantRepository productVariantRepository;
    private final UserRepository userRepository;
    private final OrderService orderService;
    private final com.sawai.ghee.repository.ReturnRequestRepository returnRequestRepository;
    private final com.sawai.ghee.service.CouponService couponService;
    private final com.sawai.ghee.service.EmailService emailService;

    @PostMapping
    public ResponseEntity<ApiResponse<OrderDto>> createOrder(
            @Valid @RequestBody CreateOrderRequest req,
            @AuthenticationPrincipal UserDetails principal) {

        User user = (principal != null)
                ? userRepository.findByEmail(principal.getUsername()).orElse(null)
                : null;

        ShippingAddressRequest addr = req.getShippingAddress();

        // Security check and recalculation of total (Security Audit fix)
        BigDecimal subtotal = BigDecimal.ZERO;
        for (OrderItemRequest itemReq : req.getItems()) {
            ProductVariant pv = productVariantRepository.findById(itemReq.getProductVariantId())
                    .orElseThrow(() -> new IllegalArgumentException("Product Variant not found: " + itemReq.getProductVariantId()));
            subtotal = subtotal.add(pv.getPrice().multiply(new BigDecimal(itemReq.getQuantity())));
        }

        BigDecimal discountAmt = BigDecimal.ZERO;
        if (req.getCouponCode() != null && !req.getCouponCode().isBlank()) {
            discountAmt = couponService.applyDiscount(subtotal, req.getCouponCode());
        }

        BigDecimal shipping = subtotal.compareTo(new BigDecimal("999")) >= 0 ? BigDecimal.ZERO : new BigDecimal("99");
        BigDecimal calculatedTotal = subtotal.add(shipping).subtract(discountAmt);

        // Verify total matches calculated amount
        if (req.getTotal() == null || req.getTotal().subtract(calculatedTotal).abs().compareTo(new BigDecimal("1.0")) > 0) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Order verification failed: Price tempering or mismatch detected. Calculated: " + calculatedTotal));
        }

        String orderId = "SWI" + System.currentTimeMillis() + String.format("%04x", new java.security.SecureRandom().nextInt(0xFFFF));

        Order order = new Order();
        order.setId(orderId);
        order.setUser(user);
        order.setTotal(calculatedTotal);
        order.setShipping(shipping);
        order.setDiscount(discountAmt);
        order.setCouponCode(req.getCouponCode());
        order.setStatus(Order.OrderStatus.PENDING);
        order.setCustomerName(addr.getName());
        order.setCustomerPhone(addr.getPhone());
        order.setCustomerEmail(addr.getEmail());
        order.setAddressLine(addr.getAddress());
        order.setCity(addr.getCity());
        order.setState(addr.getState());
        order.setPinCode(addr.getPin());
        order.setLandmark(addr.getLandmark());

        // Create order items
        List<OrderItem> items = req.getItems().stream().map(i -> {
            ProductVariant pv = productVariantRepository.findById(i.getProductVariantId())
                    .orElseThrow(() -> new IllegalArgumentException("Product Variant not found: " + i.getProductVariantId()));
            OrderItem item = new OrderItem();
            item.setProductVariant(pv);
            item.setQuantity(i.getQuantity());
            item.setUnitPrice(pv.getPrice()); // Always use database product price!
            return item;
        }).collect(Collectors.toList());

        Order saved = orderService.processOrder(order, items);

        // Increment coupon usage count upon successful creation
        if (req.getCouponCode() != null && !req.getCouponCode().isBlank()) {
            couponService.incrementUsage(req.getCouponCode());
        }

        return ResponseEntity.ok(ApiResponse.ok("Order created", toDto(saved)));
    }

    @GetMapping("/my")
    public ResponseEntity<?> myOrders(
            @AuthenticationPrincipal UserDetails principal,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        User user = userRepository.findByEmail(principal.getUsername()).orElseThrow();
        org.springframework.data.domain.Pageable pageable = org.springframework.data.domain.PageRequest.of(page, size);
        org.springframework.data.domain.Page<Order> orderPage = orderRepository.findByUserIdOrderByCreatedAtDesc(user.getId(), pageable);
        List<OrderDto> dtos = orderPage.getContent().stream().map(this::toDto).collect(Collectors.toList());
        return ResponseEntity.ok(Map.of(
                "content", dtos,
                "totalPages", orderPage.getTotalPages(),
                "totalElements", orderPage.getTotalElements(),
                "currentPage", orderPage.getNumber(),
                "size", orderPage.getSize()
        ));
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderDto> getOrder(@PathVariable String id) {
        return orderService.findOrderById(id)
                .map(o -> ResponseEntity.ok(toDto(o)))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getAllOrders(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        org.springframework.data.domain.Pageable pageable = org.springframework.data.domain.PageRequest.of(page, size);
        org.springframework.data.domain.Page<Order> orderPage = orderRepository.findAllByOrderByCreatedAtDesc(pageable);
        List<OrderDto> dtos = orderPage.getContent().stream().map(this::toDto).collect(Collectors.toList());
        return ResponseEntity.ok(Map.of(
                "content", dtos,
                "totalPages", orderPage.getTotalPages(),
                "totalElements", orderPage.getTotalElements(),
                "currentPage", orderPage.getNumber(),
                "size", orderPage.getSize()
        ));
    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<OrderDto> updateStatus(@PathVariable String id, @RequestBody OrderStatusRequest req) {
        return orderRepository.findById(id).map(o -> {
            o.setStatus(Order.OrderStatus.valueOf(req.getStatus()));
            Order saved = orderRepository.save(o);
            // Send status update email alert
            emailService.sendOrderStatusUpdate(saved);
            return ResponseEntity.ok(toDto(saved));
        }).orElse(ResponseEntity.notFound().build());
    }

    // ─── Return Request Endpoints ────────────────────────────────────────────
    @PostMapping("/{id}/return")
    public ResponseEntity<ApiResponse<String>> requestReturn(
            @PathVariable String id,
            @Valid @RequestBody ReturnReasonRequest req,
            @AuthenticationPrincipal UserDetails principal) {
        User user = userRepository.findByEmail(principal.getUsername()).orElseThrow();
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Order not found: " + id));

        if (returnRequestRepository.existsByOrderId(id)) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Return already requested for this order"));
        }

        com.sawai.ghee.model.ReturnRequest returnReq = new com.sawai.ghee.model.ReturnRequest();
        returnReq.setOrder(order);
        returnReq.setUser(user);
        returnReq.setReason(req.getReason());
        returnReq.setStatus(com.sawai.ghee.model.ReturnRequest.ReturnStatus.REQUESTED);
        returnRequestRepository.save(returnReq);

        return ResponseEntity.ok(ApiResponse.ok("Return request submitted. We will contact you within 24 hours.", null));
    }

    @GetMapping("/returns/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ReturnRequestDto>> getAllReturns() {
        return ResponseEntity.ok(
                returnRequestRepository.findAllByOrderByCreatedAtDesc().stream().map(r -> {
                    ReturnRequestDto d = new ReturnRequestDto();
                    d.setId(r.getId());
                    d.setOrderId(r.getOrder().getId());
                    d.setCustomerName(r.getOrder().getCustomerName());
                    d.setReason(r.getReason());
                    d.setStatus(r.getStatus().name());
                    if (r.getCreatedAt() != null) d.setCreatedAt(r.getCreatedAt().format(DateTimeFormatter.ISO_DATE_TIME));
                    return d;
                }).collect(Collectors.toList()));
    }

    @PatchMapping("/returns/{returnId}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<String>> updateReturnStatus(
            @PathVariable Long returnId,
            @RequestBody OrderStatusRequest req) {
        return returnRequestRepository.findById(returnId).map(r -> {
            r.setStatus(com.sawai.ghee.model.ReturnRequest.ReturnStatus.valueOf(req.getStatus()));
            returnRequestRepository.save(r);
            return ResponseEntity.ok(ApiResponse.ok("Return status updated", (String) null));
        }).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}/invoice")
    public ResponseEntity<String> getInvoice(@PathVariable String id) {
        Order order = orderService.findOrderById(id)
                .orElseThrow(() -> new IllegalArgumentException("Order not found: " + id));

        StringBuilder html = new StringBuilder();
        html.append("<!DOCTYPE html><html><head><title>Invoice - ").append(order.getId()).append("</title>");
        html.append("<style>");
        html.append("body { font-family: 'DM Sans', sans-serif; color: #333; margin: 40px; }");
        html.append(".invoice-box { max-width: 800px; margin: auto; padding: 30px; border: 1px solid #eee; box-shadow: 0 0 10px rgba(0, 0, 0, 0.15); font-size: 16px; line-height: 24px; }");
        html.append(".invoice-box table { width: 100%; line-height: inherit; text-align: left; border-collapse: collapse; }");
        html.append(".invoice-box table td { padding: 5px; vertical-align: top; }");
        html.append(".invoice-box table tr td:nth-child(2) { text-align: right; }");
        html.append(".invoice-box table tr.top table td { padding-bottom: 20px; }");
        html.append(".invoice-box table tr.top table td.title { font-size: 45px; line-height: 45px; color: #333; font-family: 'Cormorant Garamond', serif; font-weight: bold; }");
        html.append(".invoice-box table tr.information table td { padding-bottom: 40px; }");
        html.append(".invoice-box table tr.heading td { background: #f7f7f7; border-bottom: 1px solid #ddd; font-weight: bold; }");
        html.append(".invoice-box table tr.details td { padding-bottom: 20px; }");
        html.append(".invoice-box table tr.item td { border-bottom: 1px solid #eee; }");
        html.append(".invoice-box table tr.item.last td { border-bottom: none; }");
        html.append(".invoice-box table tr.total td:nth-child(2) { border-top: 2px solid #eee; font-weight: bold; }");
        html.append("</style></head><body>");
        html.append("<div class='invoice-box'><table>");

        // Header
        html.append("<tr class='top'><td colspan='2'><table><tr><td class='title'>Sawai Ghee</td>");
        html.append("<td>Invoice #: ").append(order.getId()).append("<br>Created: ").append(order.getCreatedAt() != null ? order.getCreatedAt().format(DateTimeFormatter.ISO_LOCAL_DATE) : "N/A").append("</td></tr></table></td></tr>");

        // Info
        html.append("<tr class='information'><td colspan='2'><table><tr><td>");
        html.append("Sawai Gir Amrut Ghee Inc.<br>123 Farm House Road<br>Pune, MH - 411001<br>GSTIN: 27AAAAA1111A1Z1");
        html.append("</td><td>");
        html.append(order.getCustomerName()).append("<br>").append(order.getAddressLine()).append("<br>").append(order.getCity()).append(" - ").append(order.getPinCode()).append("<br>").append(order.getCustomerPhone());
        html.append("</td></tr></table></td></tr>");

        // Heading
        html.append("<tr class='heading'><td>Item</td><td>Price</td></tr>");

        // Items
        if (order.getItems() != null) {
            for (OrderItem item : order.getItems()) {
                String sizeStr = item.getProductVariant() != null ? " (" + item.getProductVariant().getSize() + ")" : "";
                String nameStr = item.getProductVariant() != null ? item.getProductVariant().getProduct().getName() : "Product";
                html.append("<tr class='item'><td>")
                        .append(nameStr).append(sizeStr).append(" x ").append(item.getQuantity())
                        .append("</td><td>₹")
                        .append(item.getUnitPrice().multiply(new BigDecimal(item.getQuantity())))
                        .append("</td></tr>");
            }
        }

        // Subtotal, shipping, discount, total
        BigDecimal subtotal = BigDecimal.ZERO;
        if (order.getItems() != null) {
            for (OrderItem item : order.getItems()) {
                subtotal = subtotal.add(item.getUnitPrice().multiply(new BigDecimal(item.getQuantity())));
            }
        }

        html.append("<tr class='item'><td>Subtotal</td><td>₹").append(subtotal).append("</td></tr>");
        if (order.getDiscount().compareTo(BigDecimal.ZERO) > 0) {
            html.append("<tr class='item'><td>Discount (").append(order.getCouponCode() != null ? order.getCouponCode() : "Coupon").append(")</td><td>-₹").append(order.getDiscount()).append("</td></tr>");
        }
        html.append("<tr class='item'><td>Shipping</td><td>₹").append(order.getShipping()).append("</td></tr>");
        html.append("<tr class='total'><td></td><td>Total: ₹").append(order.getTotal()).append("</td></tr>");

        html.append("</table></div></body></html>");

        return ResponseEntity.ok()
                .header("Content-Type", "text/html")
                .body(html.toString());
    }

    @GetMapping("/{id}/track")
    public ResponseEntity<?> trackOrder(@PathVariable String id) {
        Order order = orderService.findOrderById(id)
                .orElseThrow(() -> new IllegalArgumentException("Order not found: " + id));

        String carrier = "Delhivery";
        String trackingNumber = "DEL" + Math.abs(id.hashCode()) + "IN";

        List<Map<String, String>> events = new java.util.ArrayList<>();

        // Base event (always present)
        events.add(Map.of(
                "status", "Order Placed",
                "location", "Customer App",
                "time", order.getCreatedAt() != null ? order.getCreatedAt().format(DateTimeFormatter.ofPattern("dd MMM yyyy, hh:mm a")) : "Just now",
                "details", "Order successfully generated."
        ));

        if (order.getStatus() == Order.OrderStatus.PROCESSING ||
                order.getStatus() == Order.OrderStatus.SHIPPED ||
                order.getStatus() == Order.OrderStatus.DELIVERED) {
            events.add(Map.of(
                    "status", "Order Confirmed",
                    "location", "Sawai Warehouse",
                    "time", order.getCreatedAt() != null ? order.getCreatedAt().plusHours(2).format(DateTimeFormatter.ofPattern("dd MMM yyyy, hh:mm a")) : "2 hours later",
                    "details", "Merchant accepted the order and packing is complete."
            ));
        }

        if (order.getStatus() == Order.OrderStatus.SHIPPED ||
                order.getStatus() == Order.OrderStatus.DELIVERED) {
            events.add(Map.of(
                    "status", "Picked up by Carrier",
                    "location", "Pune Sorting Facility",
                    "time", order.getCreatedAt() != null ? order.getCreatedAt().plusHours(6).format(DateTimeFormatter.ofPattern("dd MMM yyyy, hh:mm a")) : "6 hours later",
                    "details", "Delhivery has picked up the package. Tracking ID is active."
            ));
            events.add(Map.of(
                    "status", "In Transit",
                    "location", "Destination Hub",
                    "time", order.getCreatedAt() != null ? order.getCreatedAt().plusDays(1).format(DateTimeFormatter.ofPattern("dd MMM yyyy, hh:mm a")) : "1 day later",
                    "details", "Shipment is in transit to destination hub."
            ));
        }

        if (order.getStatus() == Order.OrderStatus.DELIVERED) {
            events.add(Map.of(
                    "status", "Out for Delivery",
                    "location", "Local Delivery Center",
                    "time", order.getCreatedAt() != null ? order.getCreatedAt().plusDays(2).format(DateTimeFormatter.ofPattern("dd MMM yyyy, hh:mm a")) : "2 days later",
                    "details", "Delivery executive is out with the shipment."
            ));
            events.add(Map.of(
                    "status", "Delivered",
                    "location", "Customer Address",
                    "time", order.getCreatedAt() != null ? order.getCreatedAt().plusDays(2).plusHours(4).format(DateTimeFormatter.ofPattern("dd MMM yyyy, hh:mm a")) : "2 days later",
                    "details", "Package successfully delivered. Signed by customer."
            ));
        }

        if (order.getStatus() == Order.OrderStatus.CANCELLED) {
            events.add(Map.of(
                    "status", "Cancelled",
                    "location", "System",
                    "time", "N/A",
                    "details", "Order was cancelled by the customer or admin."
            ));
        }

        return ResponseEntity.ok(Map.of(
                "orderId", order.getId(),
                "status", order.getStatus().name(),
                "carrier", carrier,
                "trackingNumber", trackingNumber,
                "events", events
        ));
    }

    private OrderDto toDto(Order o) {
        OrderDto d = new OrderDto();
        d.setId(o.getId());
        d.setCustomerName(o.getCustomerName());
        d.setCustomerEmail(o.getCustomerEmail());
        d.setCustomerPhone(o.getCustomerPhone());
        d.setTotal(o.getTotal());
        d.setShipping(o.getShipping());
        d.setStatus(o.getStatus() != null ? o.getStatus().name() : "PENDING");
        d.setCouponCode(o.getCouponCode());
        d.setCity(o.getCity());
        d.setAddressLine(o.getAddressLine());
        d.setPinCode(o.getPinCode());
        if (o.getCreatedAt() != null) d.setCreatedAt(o.getCreatedAt().format(DateTimeFormatter.ISO_DATE_TIME));
        if (o.getItems() != null) {
            d.setItems(o.getItems().stream().map(i -> {
                OrderItemDto id2 = new OrderItemDto();
                id2.setId(i.getId());
                id2.setQuantity(i.getQuantity());
                id2.setUnitPrice(i.getUnitPrice());
                if (i.getProductVariant() != null) {
                    id2.setProductId(i.getProductVariant().getProduct().getId());
                    id2.setProductName(i.getProductVariant().getProduct().getName());
                    id2.setProductSize(i.getProductVariant().getSize());
                }
                return id2;
            }).collect(Collectors.toList()));
        }
        return d;
    }
}

