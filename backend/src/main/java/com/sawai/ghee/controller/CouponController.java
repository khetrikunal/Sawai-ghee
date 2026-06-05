package com.sawai.ghee.controller;

import com.sawai.ghee.model.Coupon;
import com.sawai.ghee.repository.CouponRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/coupons")
@RequiredArgsConstructor
public class CouponController {

    private final CouponRepository couponRepository;

    @GetMapping("/validate")
    public ResponseEntity<?> validateCoupon(@RequestParam String code) {
        return couponRepository.findByCodeIgnoreCaseAndActiveTrue(code.trim())
                .map(c -> {
                    if (c.getExpiryDate() != null && c.getExpiryDate().isBefore(LocalDateTime.now())) {
                        return ResponseEntity.badRequest().body(Map.of("message", "Coupon has expired"));
                    }
                    if (c.getUsageLimit() != null && c.getUsageCount() >= c.getUsageLimit()) {
                        return ResponseEntity.badRequest().body(Map.of("message", "Coupon usage limit reached"));
                    }
                    return ResponseEntity.ok(Map.of(
                            "code", c.getCode(),
                            "discountPercent", c.getDiscountPercent()
                    ));
                })
                .orElse(ResponseEntity.badRequest().body(Map.of("message", "Invalid coupon code")));
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Coupon>> getAllCoupons() {
        return ResponseEntity.ok(couponRepository.findAll());
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Coupon> createCoupon(@RequestBody Coupon coupon) {
        if (coupon.getCode() != null) {
            coupon.setCode(coupon.getCode().toUpperCase().trim());
        }
        return ResponseEntity.ok(couponRepository.save(coupon));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Coupon> updateCoupon(@PathVariable Long id, @RequestBody Coupon req) {
        return couponRepository.findById(id).map(c -> {
            c.setCode(req.getCode().toUpperCase().trim());
            c.setDiscountPercent(req.getDiscountPercent());
            c.setExpiryDate(req.getExpiryDate());
            c.setUsageLimit(req.getUsageLimit());
            c.setActive(req.isActive());
            return ResponseEntity.ok(couponRepository.save(c));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteCoupon(@PathVariable Long id) {
        couponRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
