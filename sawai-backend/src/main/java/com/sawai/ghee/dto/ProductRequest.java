package com.sawai.ghee.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProductRequest {
    @NotBlank String name;
    @NotBlank String size;
    @NotNull @Positive BigDecimal price;
    BigDecimal originalPrice;
    Integer discount;
    String description;
    @NotNull @Min(0) Integer stock;
    String badge;
    String imageUrl;
    Boolean active = true;
}
