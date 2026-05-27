package com.sawai.ghee.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class OrderStatusRequest {
    @NotBlank String status;
}
