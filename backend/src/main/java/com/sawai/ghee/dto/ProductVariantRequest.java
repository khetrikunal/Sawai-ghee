package com.sawai.ghee.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProductVariantRequest {
    private Long id; // optional for edit
    @NotBlank String size;
    @NotNull @Positive BigDecimal price;
    BigDecimal originalPrice;
    Integer discount;
    @NotNull @Min(0) Integer stock;
    Boolean active = true;
}
