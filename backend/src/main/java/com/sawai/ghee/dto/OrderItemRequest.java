package com.sawai.ghee.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class OrderItemRequest {
    @NotNull Long productId;
    @NotNull @Min(1) Integer quantity;
    @NotNull BigDecimal price;
}
