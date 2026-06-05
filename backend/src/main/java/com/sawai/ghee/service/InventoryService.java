package com.sawai.ghee.service;

import com.sawai.ghee.model.ProductVariant;
import com.sawai.ghee.repository.ProductVariantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InventoryService {

    private final ProductVariantRepository productVariantRepository;

    public boolean isInStock(Long productVariantId, int quantity) {
        return productVariantRepository.findById(productVariantId)
                .map(pv -> pv.getStock() >= quantity)
                .orElse(false);
    }

    @Transactional
    public void reduceStock(Long productVariantId, int quantity) {
        productVariantRepository.findById(productVariantId).ifPresent(pv -> {
            int newStock = pv.getStock() - quantity;
            if (newStock < 0) throw new IllegalArgumentException("Insufficient stock for product variant ID: " + productVariantId);
            pv.setStock(newStock);
            productVariantRepository.save(pv);
        });
    }

    @Transactional
    public void restoreStock(Long productVariantId, int quantity) {
        productVariantRepository.findById(productVariantId).ifPresent(pv -> {
            pv.setStock(pv.getStock() + quantity);
            productVariantRepository.save(pv);
        });
    }

    public List<ProductVariant> getLowStockVariants(int threshold) {
        return productVariantRepository.findAll().stream()
                .filter(pv -> pv.isActive() && pv.getStock() <= threshold)
                .collect(Collectors.toList());
    }
}
