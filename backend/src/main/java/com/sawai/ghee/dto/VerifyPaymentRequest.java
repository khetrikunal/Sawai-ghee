package com.sawai.ghee.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class VerifyPaymentRequest {
    @NotBlank String razorpayOrderId;
    @NotBlank String razorpayPaymentId;
    @NotBlank String razorpaySignature;
    String backendOrderId;
}
