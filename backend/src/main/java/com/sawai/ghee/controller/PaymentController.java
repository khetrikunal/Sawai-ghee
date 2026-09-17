package com.sawai.ghee.controller;

import com.razorpay.RazorpayClient;
import com.sawai.ghee.dto.*;
import com.sawai.ghee.model.Order;
import com.sawai.ghee.model.Payment;
import com.sawai.ghee.repository.OrderRepository;
import com.sawai.ghee.repository.PaymentRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.math.BigDecimal;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentRepository paymentRepository;
    private final OrderRepository orderRepository;

    @Value("${razorpay.key.id}")
    private String razorpayKeyId;

    @Value("${razorpay.key.secret}")
    private String razorpayKeySecret;

    @PostMapping("/create-order")
    @org.springframework.transaction.annotation.Transactional
    public ResponseEntity<ApiResponse<PaymentOrderResponse>> createOrder(
            @Valid @RequestBody CreatePaymentOrderRequest req) {
        try {
            RazorpayClient client = new RazorpayClient(razorpayKeyId, razorpayKeySecret);
            JSONObject options = new JSONObject();
            options.put("amount", req.getAmount().multiply(new BigDecimal(100)).longValue());
            options.put("currency", "INR");
            String receipt = req.getReceipt() != null ? req.getReceipt() : "sawai_" + System.currentTimeMillis();
            options.put("receipt", receipt);

            com.razorpay.Order rzpOrder = client.orders.create(options);
            String rzpOrderId = rzpOrder.get("id");

            // Persist mapping between Razorpay order and backend order (Critical fix: Payment binding)
            String targetOrderId = (req.getBackendOrderId() != null && !req.getBackendOrderId().isBlank())
                    ? req.getBackendOrderId()
                    : req.getReceipt();

            if (targetOrderId != null) {
                orderRepository.findById(targetOrderId).ifPresent(order -> {
                    Payment payment = paymentRepository.findByOrderId(order.getId())
                            .orElse(Payment.builder().order(order).build());
                    payment.setRazorpayOrderId(rzpOrderId);
                    payment.setAmount(req.getAmount());
                    payment.setStatus(Payment.PaymentStatus.PENDING);
                    paymentRepository.save(payment);
                });
            }

            PaymentOrderResponse resp = new PaymentOrderResponse();
            resp.setId(rzpOrderId);
            resp.setAmount(req.getAmount());
            resp.setCurrency("INR");
            resp.setStatus("created");
            return ResponseEntity.ok(ApiResponse.ok(resp));
        } catch (Exception e) {
            return ResponseEntity.status(500)
                    .body(ApiResponse.error("Failed to create payment order: " + e.getMessage()));
        }
    }

    @PostMapping("/verify")
    @org.springframework.transaction.annotation.Transactional
    public ResponseEntity<ApiResponse<String>> verifyPayment(@Valid @RequestBody VerifyPaymentRequest req) {
        try {
            String payload = req.getRazorpayOrderId() + "|" + req.getRazorpayPaymentId();
            Mac mac = Mac.getInstance("HmacSHA256");
            mac.init(new SecretKeySpec(razorpayKeySecret.getBytes(), "HmacSHA256"));
            byte[] hashBytes = mac.doFinal(payload.getBytes());

            StringBuilder sb = new StringBuilder();
            for (byte b : hashBytes) sb.append(String.format("%02x", b));
            String computed = sb.toString();

            if (!computed.equals(req.getRazorpaySignature())) {
                return ResponseEntity.status(400).body(ApiResponse.error("Payment verification failed: Invalid signature"));
            }

            // Validate that the submitted razorpayOrderId corresponds to the stored backendOrderId (Critical fix: verification binding)
            if (req.getBackendOrderId() == null || req.getBackendOrderId().isBlank()) {
                return ResponseEntity.status(400).body(ApiResponse.error("Payment verification failed: Missing backend order ID"));
            }

            Payment payment = paymentRepository.findByRazorpayOrderId(req.getRazorpayOrderId())
                    .orElse(null);

            if (payment == null || payment.getOrder() == null || !req.getBackendOrderId().equals(payment.getOrder().getId())) {
                return ResponseEntity.status(400).body(ApiResponse.error("Payment verification failed: Razorpay order does not match registered backend order"));
            }

            // Update order status to PROCESSING and payment to SUCCESS after verified binding
            Order order = payment.getOrder();
            order.setStatus(Order.OrderStatus.PROCESSING);
            orderRepository.save(order);

            payment.setRazorpayPaymentId(req.getRazorpayPaymentId());
            payment.setRazorpaySignature(req.getRazorpaySignature());
            payment.setStatus(Payment.PaymentStatus.SUCCESS);
            paymentRepository.save(payment);

            return ResponseEntity.ok(ApiResponse.ok("Payment verified successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(500)
                    .body(ApiResponse.error("Verification error: " + e.getMessage()));
        }
    }

    @PostMapping("/webhook")
    public ResponseEntity<String> webhook(
            @RequestBody String payload,
            @RequestHeader(value = "X-Razorpay-Signature", required = false) String signature) {
        try {
            if (signature == null || signature.isBlank()) {
                return ResponseEntity.status(400).body("Missing signature");
            }

            // Verify webhook signature using HMAC-SHA256
            Mac mac = Mac.getInstance("HmacSHA256");
            mac.init(new SecretKeySpec(razorpayKeySecret.getBytes(), "HmacSHA256"));
            byte[] hashBytes = mac.doFinal(payload.getBytes());
            StringBuilder sb = new StringBuilder();
            for (byte b : hashBytes) sb.append(String.format("%02x", b));
            String computedSignature = sb.toString();

            if (!computedSignature.equals(signature)) {
                return ResponseEntity.status(400).body("Invalid signature");
            }

            // Parse webhook event and update matching order status by Razorpay Order ID (Critical fix)
            JSONObject event = new JSONObject(payload);
            String eventType = event.optString("event", "");

            if ("payment.captured".equals(eventType) || "order.paid".equals(eventType)) {
                JSONObject paymentEntity = (event.optJSONObject("payload") != null && event.getJSONObject("payload").optJSONObject("payment") != null)
                        ? event.getJSONObject("payload").getJSONObject("payment").optJSONObject("entity")
                        : null;
                String rzpOrderId = paymentEntity != null ? paymentEntity.optString("order_id") : null;
                if (rzpOrderId == null || rzpOrderId.isBlank()) {
                    JSONObject orderEntity = (event.optJSONObject("payload") != null && event.getJSONObject("payload").optJSONObject("order") != null)
                            ? event.getJSONObject("payload").getJSONObject("order").optJSONObject("entity")
                            : null;
                    if (orderEntity != null) {
                        rzpOrderId = orderEntity.optString("id");
                    }
                }

                if (rzpOrderId != null && !rzpOrderId.isBlank()) {
                    paymentRepository.findByRazorpayOrderId(rzpOrderId).ifPresent(payment -> {
                        Order o = payment.getOrder();
                        if (o != null && o.getStatus() == Order.OrderStatus.PENDING) {
                            o.setStatus(Order.OrderStatus.PROCESSING);
                            orderRepository.save(o);
                        }
                        payment.setStatus(Payment.PaymentStatus.SUCCESS);
                        if (paymentEntity != null && paymentEntity.optString("id") != null && !paymentEntity.optString("id").isBlank()) {
                            payment.setRazorpayPaymentId(paymentEntity.optString("id"));
                        }
                        paymentRepository.save(payment);
                    });
                }
            }

            return ResponseEntity.ok("OK");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Webhook processing error");
        }
    }
}
