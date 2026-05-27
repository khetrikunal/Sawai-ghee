package com.sawai.ghee.dto;

import lombok.Data;

@Data
public class ReviewDto {
    private Long id;
    private Long productId;
    private String userName;
    private Integer rating;
    private String comment;
    private String createdAt;
}
