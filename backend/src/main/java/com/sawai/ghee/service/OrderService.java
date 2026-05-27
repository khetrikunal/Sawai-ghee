package com.sawai.ghee.service;

import com.sawai.ghee.model.Order;
import com.sawai.ghee.model.OrderItem;
import com.sawai.ghee.model.Product;
import com.sawai.ghee.repository.OrderRepository;
import com.sawai.ghee.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final EmailService emailService;

    @Transactional
    public Order processOrder(Order order, List<OrderItem> items) {
        // Validate & reduce stock
        for (OrderItem item : items) {
            Product product = productRepository.findById(item.getProduct().getId())
                    .orElseThrow(() -> new IllegalArgumentException("Product not found: " + item.getProduct().getId()));

            if (product.getStock() < item.getQuantity()) {
                throw new IllegalArgumentException(
                        "Insufficient stock for: " + product.getName() + " " + product.getSize());
            }
            product.setStock(product.getStock() - item.getQuantity());
            productRepository.save(product);
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

    public Optional<Order> findById(String orderId) {
        return orderRepository.findById(orderId);
    }
}
