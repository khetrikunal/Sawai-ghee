package com.sawai.ghee.controller;

import com.sawai.ghee.dto.ApiResponse;
import com.sawai.ghee.dto.ReviewDto;
import com.sawai.ghee.dto.ReviewRequest;
import com.sawai.ghee.model.Product;
import com.sawai.ghee.model.Review;
import com.sawai.ghee.model.User;
import com.sawai.ghee.repository.ProductRepository;
import com.sawai.ghee.repository.ReviewRepository;
import com.sawai.ghee.repository.UserRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewRepository reviewRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<ReviewDto>> getProductReviews(@PathVariable Long productId) {
        return ResponseEntity.ok(
                reviewRepository.findByProductId(productId)
                        .stream().map(this::toDto).collect(Collectors.toList()));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ReviewDto>> addReview(
            @Valid @RequestBody ReviewRequest req,
            @AuthenticationPrincipal UserDetails principal) {
        User user = userRepository.findByEmail(principal.getUsername()).orElseThrow();
        Product product = productRepository.findById(req.getProductId()).orElseThrow();

        if (reviewRepository.existsByUserIdAndProductId(user.getId(), product.getId())) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("You have already reviewed this product"));
        }

        Review review = Review.builder()
                .product(product).user(user)
                .rating(req.getRating()).comment(req.getComment())
                .build();

        return ResponseEntity.ok(ApiResponse.ok(toDto(reviewRepository.save(review))));
    }

    private ReviewDto toDto(Review r) {
        ReviewDto d = new ReviewDto();
        d.setId(r.getId());
        d.setRating(r.getRating());
        d.setComment(r.getComment());
        if (r.getProduct() != null) d.setProductId(r.getProduct().getId());
        if (r.getUser() != null) d.setUserName(r.getUser().getName());
        if (r.getCreatedAt() != null) d.setCreatedAt(r.getCreatedAt().format(DateTimeFormatter.ISO_DATE));
        return d;
    }
}
