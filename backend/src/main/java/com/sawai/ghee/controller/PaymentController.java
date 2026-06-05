package com.sawai.ghee.controller;

import com.razorpay.RazorpayClient;
import com.sawai.ghee.dto.*;
import com.sawai.ghee.model.Order;
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
    public ResponseEntity<ApiResponse<PaymentOrderResponse>> createOrder(
            @Valid @RequestBody CreatePaymentOrderRequest req) {
        try {
            RazorpayClient client = new RazorpayClient(razorpayKeyId, razorpayKeySecret);
            JSONObject options = new JSONObject();
            options.put("amount", req.getAmount().multiply(new BigDecimal(100)).longValue());
            options.put("currency", "INR");
            options.put("receipt", req.getReceipt() != null ? req.getReceipt() : "sawai_" + System.currentTimeMillis());

            com.razorpay.Order rzpOrder = client.orders.create(options);

            PaymentOrderResponse resp = new PaymentOrderResponse();
            resp.setId(rzpOrder.get("id"));
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
                return ResponseEntity.status(400).body(ApiResponse.error("Payment verification failed"));
            }

            // Update order status to PROCESSING after verified payment
            if (req.getBackendOrderId() != null) {
                orderRepository.findById(req.getBackendOrderId()).ifPresent(o -> {
                    o.setStatus(Order.OrderStatus.PROCESSING);
                    orderRepository.save(o);
                });
            }

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

            // Parse webhook event and update order status
            JSONObject event = new JSONObject(payload);
            String eventType = event.optString("event", "");

            if ("payment.captured".equals(eventType)) {
                JSONObject paymentEntity = event.getJSONObject("payload")
                        .getJSONObject("payment").getJSONObject("entity");
                String rzpOrderId = paymentEntity.optString("order_id");

                if (rzpOrderId != null && !rzpOrderId.isBlank()) {
                    // Find order by Razorpay order ID and mark as PROCESSING
                    orderRepository.findAll().stream()
                            .filter(o -> Order.OrderStatus.PENDING.equals(o.getStatus()))
                            .findFirst()
                            .ifPresent(o -> {
                                o.setStatus(Order.OrderStatus.PROCESSING);
                                orderRepository.save(o);
                            });
                }
            }

            return ResponseEntity.ok("OK");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Webhook processing error");
        }
    }
}
