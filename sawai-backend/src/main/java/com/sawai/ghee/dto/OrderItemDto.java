package com.sawai.ghee.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class OrderItemDto {
    private Long id;
    private Long productId;
    private String productName;
    private String productSize;
    private Integer quantity;
    private BigDecimal unitPrice;
}
