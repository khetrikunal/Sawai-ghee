package com.sawai.ghee.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class ShippingAddressRequest {
    @NotBlank String name;
    @NotBlank String phone;
    String email;
    @NotBlank String address;
    @NotBlank String city;
    String state;
    @NotBlank String pin;
    String landmark;
}
