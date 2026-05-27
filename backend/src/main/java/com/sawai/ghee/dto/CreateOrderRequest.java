package com.sawai.ghee.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class CreateOrderRequest {
    @NotNull List<OrderItemRequest> items;
    @NotNull ShippingAddressRequest shippingAddress;
    BigDecimal total;
    String couponCode;
}
