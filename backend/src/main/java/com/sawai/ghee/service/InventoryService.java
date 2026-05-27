package com.sawai.ghee.service;

import com.sawai.ghee.model.Product;
import com.sawai.ghee.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;

@Service
@RequiredArgsConstructor
public class InventoryService {

    private final ProductRepository productRepository;

    public boolean isInStock(Long productId, int quantity) {
        return productRepository.findById(productId)
                .map(p -> p.getStock() >= quantity)
                .orElse(false);
    }

    @Transactional
    public void reduceStock(Long productId, int quantity) {
        productRepository.findById(productId).ifPresent(p -> {
            int newStock = p.getStock() - quantity;
            if (newStock < 0) throw new IllegalArgumentException("Insufficient stock for product ID: " + productId);
            p.setStock(newStock);
            productRepository.save(p);
        });
    }

    @Transactional
    public void restoreStock(Long productId, int quantity) {
        productRepository.findById(productId).ifPresent(p -> {
            p.setStock(p.getStock() + quantity);
            productRepository.save(p);
        });
    }

    public List<Product> getLowStockProducts(int threshold) {
        return productRepository.findByActiveTrue().stream()
                .filter(p -> p.getStock() <= threshold)
                .toList();
    }
}
