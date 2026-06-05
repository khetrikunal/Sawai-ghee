package com.sawai.ghee.repository;

import com.sawai.ghee.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByActiveTrueOrderByCreatedAtDesc();
    Page<Product> findByActiveTrueOrderByCreatedAtDesc(Pageable pageable);
    List<Product> findByActiveTrue();
    Page<Product> findAll(Pageable pageable);
    List<Product> findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(String name, String description);
}
