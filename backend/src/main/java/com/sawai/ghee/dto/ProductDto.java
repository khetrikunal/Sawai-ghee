package com.sawai.ghee.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class ProductDto {
    private Long id;
    private String name;
    private String description;
    private String badge;
    private String imageUrl;
    private Boolean active;
    private String createdAt;

    // Variants and gallery list
    private List<ProductVariantDto> variants;
    private List<String> images;

    // Legacy fields for backward compatibility (mapped to first variant)
    private String size;
    private BigDecimal price;
    private BigDecimal originalPrice;
    private Integer discount;
    private Integer stock;
}
