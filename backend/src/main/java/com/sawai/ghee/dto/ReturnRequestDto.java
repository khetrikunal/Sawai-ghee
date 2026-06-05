package com.sawai.ghee.dto;

import lombok.Data;

@Data
public class ReturnRequestDto {
    private Long id;
    private String orderId;
    private String customerName;
    private String reason;
    private String status;
    private String createdAt;
}
