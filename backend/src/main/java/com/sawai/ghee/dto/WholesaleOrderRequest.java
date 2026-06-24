package com.sawai.ghee.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class WholesaleOrderRequest {

    @NotBlank
    private String planType; // 5L, 10L, 100L

    @Min(0)
    private int qty200ml;

    @Min(0)
    private int qty500ml;

    @Min(0)
    private int qty1L;
}

