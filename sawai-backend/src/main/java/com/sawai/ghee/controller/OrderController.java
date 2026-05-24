package com.sawai.ghee.controller;

import com.sawai.ghee.dto.*;
import com.sawai.ghee.model.*;
import com.sawai.ghee.repository.*;
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
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    @PostMapping
    public ResponseEntity<ApiResponse<OrderDto>> createOrder(
            @Valid @RequestBody CreateOrderRequest req,
            @AuthenticationPrincipal UserDetails principal) {

        User user = (principal != null)
                ? userRepository.findByEmail(principal.getUsername()).orElse(null)
                : null;

        ShippingAddressRequest addr = req.getShippingAddress();

        String orderId = "SWI" + System.currentTimeMillis();
        BigDecimal shipping = (req.getTotal() != null && req.getTotal().compareTo(new BigDecimal("999")) >= 0)
                ? BigDecimal.ZERO
                : new BigDecimal("99");

        Order order = Order.builder()
                .id(orderId).user(user).total(req.getTotal()).shipping(shipping)
                .couponCode(req.getCouponCode()).status(Order.OrderStatus.PENDING)
                .customerName(addr.getName()).customerPhone(addr.getPhone())
                .customerEmail(addr.getEmail()).addressLine(addr.getAddress())
                .city(addr.getCity()).state(addr.getState()).pinCode(addr.getPin())
                .landmark(addr.getLandmark())
                .build();

        orderRepository.save(order);

        // Create order items & reduce stock
        List<OrderItem> items = req.getItems().stream().map(i -> {
            Product p = productRepository.findById(i.getProductId())
                    .orElseThrow(() -> new IllegalArgumentException("Product not found: " + i.getProductId()));
            p.setStock(Math.max(0, p.getStock() - i.getQuantity()));
            productRepository.save(p);
            return OrderItem.builder()
                    .order(order).product(p)
                    .quantity(i.getQuantity()).unitPrice(i.getPrice())
                    .build();
        }).collect(Collectors.toList());

        order.setItems(items);
        orderRepository.save(order);

        return ResponseEntity.ok(ApiResponse.ok("Order created", toDto(order)));
    }

    @GetMapping("/my")
    public ResponseEntity<List<OrderDto>> myOrders(@AuthenticationPrincipal UserDetails principal) {
        User user = userRepository.findByEmail(principal.getUsername()).orElseThrow();
        return ResponseEntity.ok(
                orderRepository.findByUserIdOrderByCreatedAtDesc(user.getId())
                        .stream().map(this::toDto).collect(Collectors.toList()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderDto> getOrder(@PathVariable String id) {
        return orderRepository.findById(id)
                .map(o -> ResponseEntity.ok(toDto(o)))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<OrderDto>> getAllOrders() {
        return ResponseEntity.ok(
                orderRepository.findAllByOrderByCreatedAtDesc()
                        .stream().map(this::toDto).collect(Collectors.toList()));
    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<OrderDto> updateStatus(@PathVariable String id, @RequestBody OrderStatusRequest req) {
        return orderRepository.findById(id).map(o -> {
            o.setStatus(Order.OrderStatus.valueOf(req.getStatus()));
            return ResponseEntity.ok(toDto(orderRepository.save(o)));
        }).orElse(ResponseEntity.notFound().build());
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
                if (i.getProduct() != null) {
                    id2.setProductId(i.getProduct().getId());
                    id2.setProductName(i.getProduct().getName());
                    id2.setProductSize(i.getProduct().getSize());
                }
                return id2;
            }).collect(Collectors.toList()));
        }
        return d;
    }
}
