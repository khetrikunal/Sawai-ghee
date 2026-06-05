-- ============================================================
-- Sawai Gir Amrut Ghee - Product Variants Schema Refactor (Flyway V3)
-- ============================================================

-- Create product_variants table
CREATE TABLE product_variants (
    id               BIGSERIAL PRIMARY KEY,
    product_id       BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    size             VARCHAR(50) NOT NULL,
    price            NUMERIC(10,2) NOT NULL,
    original_price   NUMERIC(10,2),
    discount         INTEGER,
    stock            INTEGER NOT NULL DEFAULT 0,
    active           BOOLEAN NOT NULL DEFAULT TRUE,
    created_at       TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at       TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create product_images table for gallery
CREATE TABLE product_images (
    id          BIGSERIAL PRIMARY KEY,
    product_id  BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    image_url   TEXT NOT NULL
);

-- Migrate existing sizes/prices data to product_variants
INSERT INTO product_variants (product_id, size, price, original_price, discount, stock, active, created_at, updated_at)
SELECT id, size, price, original_price, discount, stock, active, created_at, updated_at FROM products;

-- Migrate existing image URLs to product_images
INSERT INTO product_images (product_id, image_url)
SELECT id, image_url FROM products WHERE image_url IS NOT NULL;

-- Add product_variant_id column to order_items
ALTER TABLE order_items ADD COLUMN product_variant_id BIGINT;

-- Link existing order_items to the newly created product_variants
UPDATE order_items oi
SET product_variant_id = pv.id
FROM product_variants pv
WHERE oi.product_id = pv.product_id;

-- Make product_variant_id NOT NULL and add constraint
ALTER TABLE order_items ALTER COLUMN product_variant_id SET NOT NULL;
ALTER TABLE order_items ADD CONSTRAINT fk_order_items_variant FOREIGN KEY (product_variant_id) REFERENCES product_variants(id);

-- Drop the product_id column from order_items as we now refer to product_variant_id
ALTER TABLE order_items DROP COLUMN product_id;

-- Drop size, price, original_price, discount, stock from products table
ALTER TABLE products DROP COLUMN size;
ALTER TABLE products DROP COLUMN price;
ALTER TABLE products DROP COLUMN original_price;
ALTER TABLE products DROP COLUMN discount;
ALTER TABLE products DROP COLUMN stock;
