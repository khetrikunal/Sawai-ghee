package com.sawai.ghee.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class WholesaleLeadRequest {
    @NotBlank String name;
    @NotBlank String phone;
    String email;
    String quantity;
    String businessType;
    String city;
    String message;
}
