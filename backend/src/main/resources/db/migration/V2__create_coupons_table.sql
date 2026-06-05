-- ============================================================
-- Sawai Gir Amrut Ghee - Create Coupons Table (Flyway V2)
-- ============================================================

CREATE TABLE coupons (
    id               BIGSERIAL PRIMARY KEY,
    code             VARCHAR(50) UNIQUE NOT NULL,
    discount_percent INTEGER NOT NULL CHECK (discount_percent BETWEEN 1 AND 100),
    expiry_date      TIMESTAMP,
    usage_limit      INTEGER,
    usage_count      INTEGER NOT NULL DEFAULT 0,
    active           BOOLEAN NOT NULL DEFAULT TRUE,
    created_at       TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at       TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Seed initial coupon codes
INSERT INTO coupons (code, discount_percent, expiry_date, usage_limit, usage_count, active)
VALUES
('SAWAI10', 10, '2030-12-31 23:59:59', NULL, 0, TRUE),
('FIRST15', 15, '2030-12-31 23:59:59', NULL, 0, TRUE),
('BILONA20', 20, '2030-12-31 23:59:59', NULL, 0, TRUE),
('WELCOME5', 5, '2030-12-31 23:59:59', NULL, 0, TRUE);
