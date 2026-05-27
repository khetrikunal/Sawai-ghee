package com.sawai.ghee.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class ReviewRequest {
    @NotNull Long productId;
    @NotNull @Min(1) @Max(5) Integer rating;
    String comment;
}
