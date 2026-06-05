package com.sawai.ghee.service;

import com.sawai.ghee.model.Coupon;
import com.sawai.ghee.repository.CouponRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CouponService {

    private final CouponRepository couponRepository;

    public int getDiscountPercent(String couponCode) {
        if (couponCode == null || couponCode.isBlank()) return 0;
        Optional<Coupon> couponOpt = couponRepository.findByCodeIgnoreCaseAndActiveTrue(couponCode.trim());
        if (couponOpt.isEmpty()) return 0;
        Coupon c = couponOpt.get();
        if (c.getExpiryDate() != null && c.getExpiryDate().isBefore(LocalDateTime.now())) return 0;
        if (c.getUsageLimit() != null && c.getUsageCount() >= c.getUsageLimit()) return 0;
        return c.getDiscountPercent();
    }

    public BigDecimal applyDiscount(BigDecimal amount, String couponCode) {
        int pct = getDiscountPercent(couponCode);
        if (pct == 0) return BigDecimal.ZERO;
        return amount.multiply(new BigDecimal(pct)).divide(new BigDecimal(100));
    }

    public boolean isValid(String couponCode) {
        return getDiscountPercent(couponCode) > 0;
    }

    @Transactional
    public void incrementUsage(String couponCode) {
        if (couponCode == null || couponCode.isBlank()) return;
        couponRepository.findByCodeIgnoreCase(couponCode.trim()).ifPresent(c -> {
            c.setUsageCount(c.getUsageCount() + 1);
            couponRepository.save(c);
        });
    }
}
