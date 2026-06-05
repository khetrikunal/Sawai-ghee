package com.sawai.ghee.controller;

import com.sawai.ghee.dto.ProductDto;
import com.sawai.ghee.dto.ProductRequest;
import com.sawai.ghee.dto.ProductVariantDto;
import com.sawai.ghee.dto.ProductVariantRequest;
import com.sawai.ghee.model.Product;
import com.sawai.ghee.model.ProductImage;
import com.sawai.ghee.model.ProductVariant;
import com.sawai.ghee.repository.ProductRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductRepository productRepository;

    @GetMapping
    public ResponseEntity<?> getAll(
            @RequestParam(required = false) Boolean active,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "false") boolean paginate) {
        if (paginate) {
            org.springframework.data.domain.Pageable pageable = org.springframework.data.domain.PageRequest.of(page, size);
            org.springframework.data.domain.Page<Product> productPage = (active != null && active)
                    ? productRepository.findByActiveTrueOrderByCreatedAtDesc(pageable)
                    : productRepository.findAll(pageable);
            List<ProductDto> dtos = productPage.getContent().stream().map(this::toDto).collect(Collectors.toList());
            return ResponseEntity.ok(Map.of(
                    "content", dtos,
                    "totalPages", productPage.getTotalPages(),
                    "totalElements", productPage.getTotalElements(),
                    "currentPage", productPage.getNumber(),
                    "size", productPage.getSize()
            ));
        } else {
            List<Product> products = (active != null && active)
                    ? productRepository.findByActiveTrueOrderByCreatedAtDesc()
                    : productRepository.findAll();
            return ResponseEntity.ok(products.stream().map(this::toDto).collect(Collectors.toList()));
        }
    }

    @GetMapping("/search")
    public ResponseEntity<List<ProductDto>> search(@RequestParam String q) {
        List<Product> products = productRepository.findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(q, q)
                .stream()
                .filter(p -> p.getActive() != null && p.getActive())
                .collect(Collectors.toList());
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
        Product p = new Product();
        p.setName(req.getName());
        p.setDescription(req.getDescription());
        p.setBadge(req.getBadge());
        p.setImageUrl(req.getImageUrl());
        p.setActive(req.getActive());
        p.setVariants(new ArrayList<>());
        p.setImages(new ArrayList<>());

        List<ProductVariantRequest> varReqs = req.getVariants();
        if ((varReqs == null || varReqs.isEmpty()) && req.getSize() != null && !req.getSize().trim().isEmpty()) {
            ProductVariantRequest vr = new ProductVariantRequest();
            vr.setSize(req.getSize());
            vr.setPrice(req.getPrice());
            vr.setOriginalPrice(req.getOriginalPrice());
            vr.setDiscount(req.getDiscount());
            vr.setStock(req.getStock() != null ? req.getStock() : 0);
            vr.setActive(true);
            varReqs = List.of(vr);
        }

        if (varReqs != null) {
            for (ProductVariantRequest vr : varReqs) {
                ProductVariant v = new ProductVariant();
                v.setProduct(p);
                v.setSize(vr.getSize());
                v.setPrice(vr.getPrice());
                v.setOriginalPrice(vr.getOriginalPrice());
                v.setDiscount(vr.getDiscount());
                v.setStock(vr.getStock());
                v.setActive(vr.getActive() != null ? vr.getActive() : true);
                p.getVariants().add(v);
            }
        }

        if (req.getImages() != null) {
            for (String imgUrl : req.getImages()) {
                ProductImage img = new ProductImage();
                img.setProduct(p);
                img.setImageUrl(imgUrl);
                p.getImages().add(img);
            }
        }

        return ResponseEntity.status(201).body(toDto(productRepository.save(p)));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ProductDto> update(@PathVariable Long id, @Valid @RequestBody ProductRequest req) {
        return productRepository.findById(id).map(p -> {
            p.setName(req.getName());
            p.setDescription(req.getDescription());
            p.setBadge(req.getBadge());
            p.setImageUrl(req.getImageUrl());
            p.setActive(req.getActive());

            p.getVariants().clear();
            List<ProductVariantRequest> varReqs = req.getVariants();
            if ((varReqs == null || varReqs.isEmpty()) && req.getSize() != null && !req.getSize().trim().isEmpty()) {
                ProductVariantRequest vr = new ProductVariantRequest();
                vr.setSize(req.getSize());
                vr.setPrice(req.getPrice());
                vr.setOriginalPrice(req.getOriginalPrice());
                vr.setDiscount(req.getDiscount());
                vr.setStock(req.getStock() != null ? req.getStock() : 0);
                vr.setActive(true);
                varReqs = List.of(vr);
            }

            if (varReqs != null) {
                for (ProductVariantRequest vr : varReqs) {
                    ProductVariant v = new ProductVariant();
                    v.setProduct(p);
                    v.setSize(vr.getSize());
                    v.setPrice(vr.getPrice());
                    v.setOriginalPrice(vr.getOriginalPrice());
                    v.setDiscount(vr.getDiscount());
                    v.setStock(vr.getStock());
                    v.setActive(vr.getActive() != null ? vr.getActive() : true);
                    p.getVariants().add(v);
                }
            }

            p.getImages().clear();
            if (req.getImages() != null) {
                for (String imgUrl : req.getImages()) {
                    ProductImage img = new ProductImage();
                    img.setProduct(p);
                    img.setImageUrl(imgUrl);
                    p.getImages().add(img);
                }
            }

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
            if (p.getVariants() != null && !p.getVariants().isEmpty()) {
                ProductVariant v = p.getVariants().get(0);
                v.setStock(body.get("quantity"));
            }
            return ResponseEntity.ok(toDto(productRepository.save(p)));
        }).orElse(ResponseEntity.notFound().build());
    }

    private ProductDto toDto(Product p) {
        ProductDto d = new ProductDto();
        d.setId(p.getId());
        d.setName(p.getName());
        d.setDescription(p.getDescription());
        d.setBadge(p.getBadge());
        d.setImageUrl(p.getImageUrl());
        d.setActive(p.getActive());
        if (p.getCreatedAt() != null) {
            d.setCreatedAt(p.getCreatedAt().format(DateTimeFormatter.ISO_DATE));
        }

        if (p.getVariants() != null) {
            d.setVariants(p.getVariants().stream().map(v -> {
                ProductVariantDto vd = new ProductVariantDto();
                vd.setId(v.getId());
                vd.setSize(v.getSize());
                vd.setPrice(v.getPrice());
                vd.setOriginalPrice(v.getOriginalPrice());
                vd.setDiscount(v.getDiscount());
                vd.setStock(v.getStock());
                vd.setActive(v.isActive());
                return vd;
            }).collect(Collectors.toList()));

            if (!p.getVariants().isEmpty()) {
                ProductVariant v = p.getVariants().get(0);
                d.setSize(v.getSize());
                d.setPrice(v.getPrice());
                d.setOriginalPrice(v.getOriginalPrice());
                d.setDiscount(v.getDiscount());
                d.setStock(v.getStock());
            }
        }

        if (p.getImages() != null) {
            d.setImages(p.getImages().stream().map(ProductImage::getImageUrl).collect(Collectors.toList()));
        }

        return d;
    }
}
