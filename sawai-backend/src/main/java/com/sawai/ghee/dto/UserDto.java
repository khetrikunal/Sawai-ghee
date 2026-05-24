package com.sawai.ghee.dto;

import lombok.Data;

@Data
public class UserDto {
    private Long id;
    private String name;
    private String email;
    private String phone;
    private String role;
}
