package com.sawai.ghee.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class RegisterRequest {
    @NotBlank String name;
    @Email @NotBlank String email;
    @NotBlank @Size(min = 8) String password;
    String phone;
}
