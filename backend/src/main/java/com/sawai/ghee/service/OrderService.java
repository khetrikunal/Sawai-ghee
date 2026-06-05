package com.sawai.ghee.service;

import com.sawai.ghee.model.Order;
import com.sawai.ghee.model.OrderItem;
import com.sawai.ghee.model.ProductVariant;
import com.sawai.ghee.repository.OrderRepository;
import com.sawai.ghee.repository.ProductVariantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductVariantRepository productVariantRepository;
    private final EmailService emailService;

    @Transactional
    public Order processOrder(Order order, List<OrderItem> items) {
        // Validate & reduce stock
        for (OrderItem item : items) {
            ProductVariant variant = productVariantRepository.findById(item.getProductVariant().getId())
                    .orElseThrow(() -> new IllegalArgumentException("Product Variant not found: " + item.getProductVariant().getId()));

            if (variant.getStock() < item.getQuantity()) {
                throw new IllegalArgumentException(
                        "Insufficient stock for: " + variant.getProduct().getName() + " " + variant.getSize());
            }
            variant.setStock(variant.getStock() - item.getQuantity());
            productVariantRepository.save(variant);
            item.setOrder(order);
        }

        order.setItems(items);
        Order saved = orderRepository.save(order);

        // Send confirmation email (swallows exceptions internally)
        if (saved.getCustomerEmail() != null) {
            emailService.sendOrderConfirmation(saved);
        }

        return saved;
    }

    public Optional<Order> findOrderById(String orderId) {
        return orderRepository.findById(orderId);
    }
}
