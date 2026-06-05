package com.sawai.ghee.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProductVariantDto {
    private Long id;
    private String size;
    private BigDecimal price;
    private BigDecimal originalPrice;
    private Integer discount;
    private Integer stock;
    private Boolean active;
}
