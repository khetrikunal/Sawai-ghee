package com.sawai.ghee.exception;

public class InsufficientStockException extends RuntimeException {
    public InsufficientStockException(String productName) {
        super("Insufficient stock for product: " + productName);
    }
}
