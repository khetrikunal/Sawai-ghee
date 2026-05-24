package com.sawai.ghee.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProductDto {
    private Long id;
    private String name;
    private String size;
    private BigDecimal price;
    private BigDecimal originalPrice;
    private Integer discount;
    private String description;
    private Integer stock;
    private String badge;
    private String imageUrl;
    private Boolean active;
    private String createdAt;
}
