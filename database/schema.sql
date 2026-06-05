-- ============================================================
-- Sawai Gir Amrut Ghee - PostgreSQL Database Schema
-- Vithoba Ventures Group of Companies
-- ============================================================

-- Create database
CREATE DATABASE sawai_ghee;
\c sawai_ghee;

-- ─── Extensions ──────────────────────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ─── Users ───────────────────────────────────────────────────────────────────
CREATE TABLE users (
    id           BIGSERIAL PRIMARY KEY,
    name         VARCHAR(150) NOT NULL,
    email        VARCHAR(255) NOT NULL UNIQUE,
    password     VARCHAR(255) NOT NULL,
    phone        VARCHAR(15),
    role         VARCHAR(10)  NOT NULL DEFAULT 'USER' CHECK (role IN ('USER', 'ADMIN')),
    created_at   TIMESTAMP    NOT NULL DEFAULT NOW(),
    updated_at   TIMESTAMP    NOT NULL DEFAULT NOW()
);

-- ─── Products ─────────────────────────────────────────────────────────────────
CREATE TABLE products (
    id             BIGSERIAL PRIMARY KEY,
    name           VARCHAR(200)   NOT NULL,
    size           VARCHAR(50)    NOT NULL,
    price          NUMERIC(10,2)  NOT NULL,
    original_price NUMERIC(10,2),
    discount       INTEGER,
    description    TEXT,
    stock          INTEGER        NOT NULL DEFAULT 0,
    badge          VARCHAR(50),
    image_url      TEXT,
    active         BOOLEAN        NOT NULL DEFAULT TRUE,
    created_at     TIMESTAMP      NOT NULL DEFAULT NOW(),
    updated_at     TIMESTAMP      NOT NULL DEFAULT NOW()
);

-- ─── Orders ───────────────────────────────────────────────────────────────────
CREATE TABLE orders (
    id              VARCHAR(30)   PRIMARY KEY,  -- SWI + timestamp
    user_id         BIGINT        REFERENCES users(id) ON DELETE SET NULL,
    total           NUMERIC(10,2) NOT NULL,
    shipping        NUMERIC(10,2) NOT NULL DEFAULT 0,
    discount        NUMERIC(10,2) NOT NULL DEFAULT 0,
    coupon_code     VARCHAR(30),
    status          VARCHAR(20)   NOT NULL DEFAULT 'PENDING'
                        CHECK (status IN ('PENDING','PROCESSING','SHIPPED','DELIVERED','CANCELLED')),
    -- Shipping address (denormalized)
    customer_name   VARCHAR(150)  NOT NULL,
    customer_phone  VARCHAR(15)   NOT NULL,
    customer_email  VARCHAR(255),
    address_line    TEXT          NOT NULL,
    city            VARCHAR(100)  NOT NULL,
    state           VARCHAR(100),
    pin_code        VARCHAR(10)   NOT NULL,
    landmark        VARCHAR(200),
    created_at      TIMESTAMP     NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMP     NOT NULL DEFAULT NOW()
);

-- ─── Order Items ──────────────────────────────────────────────────────────────
CREATE TABLE order_items (
    id          BIGSERIAL     PRIMARY KEY,
    order_id    VARCHAR(30)   NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id  BIGINT        NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
    quantity    INTEGER       NOT NULL CHECK (quantity > 0),
    unit_price  NUMERIC(10,2) NOT NULL
);

-- ─── Payments ─────────────────────────────────────────────────────────────────
CREATE TABLE payments (
    id                    BIGSERIAL     PRIMARY KEY,
    order_id              VARCHAR(30)   NOT NULL UNIQUE REFERENCES orders(id) ON DELETE CASCADE,
    razorpay_order_id     VARCHAR(100),
    razorpay_payment_id   VARCHAR(100),
    razorpay_signature    TEXT,
    amount                NUMERIC(10,2) NOT NULL,
    status                VARCHAR(20)   NOT NULL DEFAULT 'PENDING'
                              CHECK (status IN ('PENDING','SUCCESS','FAILED','REFUNDED')),
    created_at            TIMESTAMP     NOT NULL DEFAULT NOW()
);

-- ─── Wholesale Leads ──────────────────────────────────────────────────────────
CREATE TABLE wholesale_leads (
    id            BIGSERIAL    PRIMARY KEY,
    name          VARCHAR(150) NOT NULL,
    phone         VARCHAR(15)  NOT NULL,
    email         VARCHAR(255),
    quantity      VARCHAR(100),
    business_type VARCHAR(100),
    city          VARCHAR(100),
    message       TEXT,
    status        VARCHAR(20)  NOT NULL DEFAULT 'NEW'
                      CHECK (status IN ('NEW','CONTACTED','CONVERTED','CLOSED')),
    created_at    TIMESTAMP    NOT NULL DEFAULT NOW()
);

-- ─── Reviews ──────────────────────────────────────────────────────────────────
CREATE TABLE reviews (
    id         BIGSERIAL  PRIMARY KEY,
    product_id BIGINT     NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    user_id    BIGINT     NOT NULL REFERENCES users(id)    ON DELETE CASCADE,
    rating     SMALLINT   NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment    TEXT,
    created_at TIMESTAMP  NOT NULL DEFAULT NOW(),
    UNIQUE (user_id, product_id)
);

-- ─── Return Requests ────────────────────────────────────────────────────────
CREATE TABLE return_requests (
    id          BIGSERIAL    PRIMARY KEY,
    order_id    VARCHAR(30)  NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    user_id     BIGINT       NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    reason      TEXT         NOT NULL,
    status      VARCHAR(20)  NOT NULL DEFAULT 'REQUESTED'
                    CHECK (status IN ('REQUESTED','APPROVED','REJECTED','COMPLETED')),
    created_at  TIMESTAMP    NOT NULL DEFAULT NOW()
);

-- ─── Indexes ──────────────────────────────────────────────────────────────────
CREATE INDEX idx_orders_user_id       ON orders(user_id);
CREATE INDEX idx_orders_status        ON orders(status);
CREATE INDEX idx_orders_created_at    ON orders(created_at DESC);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_product  ON order_items(product_id);
CREATE INDEX idx_payments_rzp_order   ON payments(razorpay_order_id);
CREATE INDEX idx_reviews_product      ON reviews(product_id);
CREATE INDEX idx_products_active      ON products(active);

-- ─── Seed Data ────────────────────────────────────────────────────────────────
-- Admin user (password: Admin@123)
INSERT INTO users (name, email, password, phone, role)
VALUES (
    'Admin',
    'admin@sawaighee.com',
    '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewfFJm/4gqJNjO4q',
    '9130643003',
    'ADMIN'
);

-- Products
INSERT INTO products (name, size, price, original_price, discount, description, stock, badge, active)
VALUES
(
    'Sawai Gir Amrut Ghee', '500 ml', 699.00, 849.00, 18,
    'Premium A2 Gir Cow Ghee made with the traditional Vedic Bilona method. Each batch is handcrafted from the milk of desi Gir cows raised on our farm in Phaltan, Maharashtra. Natural golden color, grainy texture, and authentic aroma.',
    100, 'BESTSELLER', TRUE
),
(
    'Sawai Gir Amrut Ghee', '1 Litre', 1299.00, 1549.00, 16,
    'Our most popular family pack. Rich golden ghee with natural grainy texture and the authentic aroma of traditional home-made ghee. Perfect for daily cooking and special occasions.',
    75, 'POPULAR', TRUE
),
(
    'Sawai Gir Amrut Ghee', '5 Litre', 5799.00, 7200.00, 19,
    'The bulk pack — ideal for families and small businesses. Same premium quality, same traditional Bilona method. Significant savings over smaller packs. Perfect for restaurants and wholesale buyers.',
    30, 'BEST VALUE', TRUE
);
