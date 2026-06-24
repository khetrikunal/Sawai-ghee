package com.sawai.ghee.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class WholesaleLeadRequest {
    @NotBlank String name;
    @NotBlank String phone;
    String email;

    @NotBlank String planType; // 5L, 10L, 100L

    @Min(0) int qty200ml;
    @Min(0) int qty500ml;
    @Min(0) int qty1L;

    String businessType;
    String city;
    String message;
}

