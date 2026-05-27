package com.sawai.ghee.service;

import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Map;

@Service
public class CouponService {

    private static final Map<String, Integer> VALID_COUPONS = Map.of(
            "SAWAI10", 10,
            "FIRST15", 15,
            "BILONA20", 20,
            "WELCOME5", 5
    );

    public int getDiscountPercent(String couponCode) {
        if (couponCode == null || couponCode.isBlank()) return 0;
        return VALID_COUPONS.getOrDefault(couponCode.toUpperCase().trim(), 0);
    }

    public BigDecimal applyDiscount(BigDecimal amount, String couponCode) {
        int pct = getDiscountPercent(couponCode);
        if (pct == 0) return BigDecimal.ZERO;
        return amount.multiply(new BigDecimal(pct)).divide(new BigDecimal(100));
    }

    public boolean isValid(String couponCode) {
        return getDiscountPercent(couponCode) > 0;
    }
}
