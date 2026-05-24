package com.sawai.ghee.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class PaymentOrderResponse {
    private String id;              // Razorpay order ID
    private String backendOrderId;
    private BigDecimal amount;
    private String currency;
    private String status;
}
