package com.sawai.ghee.repository;

import com.sawai.ghee.model.Coupon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface CouponRepository extends JpaRepository<Coupon, Long> {
    Optional<Coupon> findByCodeIgnoreCaseAndActiveTrue(String code);
    Optional<Coupon> findByCodeIgnoreCase(String code);

    @Modifying
    @Query("UPDATE Coupon c SET c.usageCount = c.usageCount + 1 " +
           "WHERE LOWER(c.code) = LOWER(:code) " +
           "AND c.active = true " +
           "AND (c.expiryDate IS NULL OR c.expiryDate > :now) " +
           "AND (c.usageLimit IS NULL OR c.usageCount < c.usageLimit)")
    int incrementUsageIfEligible(@Param("code") String code, @Param("now") LocalDateTime now);
}
