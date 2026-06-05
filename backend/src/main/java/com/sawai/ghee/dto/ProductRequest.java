package com.sawai.ghee.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class ProductRequest {
    @NotBlank String name;
    String description;
    String badge;
    String imageUrl;
    Boolean active = true;

    // Nested lists for multi-image variants support
    private List<ProductVariantRequest> variants;
    private List<String> images;

    // Legacy fallback fields for backward compatibility
    String size;
    BigDecimal price;
    BigDecimal originalPrice;
    Integer discount;
    Integer stock;
}
