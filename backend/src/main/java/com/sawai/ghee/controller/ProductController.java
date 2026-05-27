package com.sawai.ghee.controller;

import com.sawai.ghee.dto.ProductDto;
import com.sawai.ghee.dto.ProductRequest;
import com.sawai.ghee.model.Product;
import com.sawai.ghee.repository.ProductRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductRepository productRepository;

    @GetMapping
    public ResponseEntity<List<ProductDto>> getAll(@RequestParam(required = false) Boolean active) {
        List<Product> products = (active != null && active)
                ? productRepository.findByActiveTrueOrderByCreatedAtDesc()
                : productRepository.findAll();
        return ResponseEntity.ok(products.stream().map(this::toDto).collect(Collectors.toList()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDto> getById(@PathVariable Long id) {
        return productRepository.findById(id)
                .map(p -> ResponseEntity.ok(toDto(p)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ProductDto> create(@Valid @RequestBody ProductRequest req) {
        Product p = Product.builder()
                .name(req.getName()).size(req.getSize()).price(req.getPrice())
                .originalPrice(req.getOriginalPrice()).discount(req.getDiscount())
                .description(req.getDescription()).stock(req.getStock())
                .badge(req.getBadge()).imageUrl(req.getImageUrl()).active(req.getActive())
                .build();
        return ResponseEntity.status(201).body(toDto(productRepository.save(p)));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ProductDto> update(@PathVariable Long id, @Valid @RequestBody ProductRequest req) {
        return productRepository.findById(id).map(p -> {
            p.setName(req.getName()); p.setSize(req.getSize()); p.setPrice(req.getPrice());
            p.setOriginalPrice(req.getOriginalPrice()); p.setDiscount(req.getDiscount());
            p.setDescription(req.getDescription()); p.setStock(req.getStock());
            p.setBadge(req.getBadge()); p.setImageUrl(req.getImageUrl()); p.setActive(req.getActive());
            return ResponseEntity.ok(toDto(productRepository.save(p)));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        productRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/stock")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ProductDto> updateStock(@PathVariable Long id, @RequestBody Map<String, Integer> body) {
        return productRepository.findById(id).map(p -> {
            p.setStock(body.get("quantity"));
            return ResponseEntity.ok(toDto(productRepository.save(p)));
        }).orElse(ResponseEntity.notFound().build());
    }

    private ProductDto toDto(Product p) {
        ProductDto d = new ProductDto();
        d.setId(p.getId()); d.setName(p.getName()); d.setSize(p.getSize());
        d.setPrice(p.getPrice()); d.setOriginalPrice(p.getOriginalPrice());
        d.setDiscount(p.getDiscount()); d.setDescription(p.getDescription());
        d.setStock(p.getStock()); d.setBadge(p.getBadge()); d.setImageUrl(p.getImageUrl());
        d.setActive(p.getActive());
        if (p.getCreatedAt() != null) d.setCreatedAt(p.getCreatedAt().format(DateTimeFormatter.ISO_DATE));
        return d;
    }
}
