package com.sawai.ghee.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class CreatePaymentOrderRequest {
    @NotNull BigDecimal amount;
    String currency = "INR";
    String receipt;
}
