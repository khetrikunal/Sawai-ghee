package com.sawai.ghee.repository;

import com.sawai.ghee.model.WholesaleLead;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WholesaleLeadRepository extends JpaRepository<WholesaleLead, Long> {
    List<WholesaleLead> findAllByOrderByCreatedAtDesc();
}
