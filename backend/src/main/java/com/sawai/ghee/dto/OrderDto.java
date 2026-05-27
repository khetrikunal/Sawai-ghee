package com.sawai.ghee.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class OrderDto {
    private String id;
    private String customerName;
    private String customerEmail;
    private String customerPhone;
    private BigDecimal total;
    private BigDecimal shipping;
    private String status;
    private String couponCode;
    private List<OrderItemDto> items;
    private String createdAt;
    private String city;
    private String addressLine;
    private String pinCode;
}
