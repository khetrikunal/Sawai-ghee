package com.sawai.ghee.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ReturnReasonRequest {
    @NotBlank(message = "Reason is required")
    private String reason;
}
