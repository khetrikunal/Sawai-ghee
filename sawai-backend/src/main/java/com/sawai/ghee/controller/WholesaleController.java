package com.sawai.ghee.controller;

import com.sawai.ghee.dto.ApiResponse;
import com.sawai.ghee.dto.WholesaleLeadRequest;
import com.sawai.ghee.model.WholesaleLead;
import com.sawai.ghee.repository.WholesaleLeadRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/wholesale")
@RequiredArgsConstructor
public class WholesaleController {

    private final WholesaleLeadRepository wholesaleLeadRepository;

    @PostMapping("/leads")
    public ResponseEntity<ApiResponse<String>> submitLead(@Valid @RequestBody WholesaleLeadRequest req) {
        WholesaleLead lead = WholesaleLead.builder()
                .name(req.getName()).phone(req.getPhone()).email(req.getEmail())
                .quantity(req.getQuantity()).businessType(req.getBusinessType())
                .city(req.getCity()).message(req.getMessage())
                .status(WholesaleLead.LeadStatus.NEW)
                .build();
        wholesaleLeadRepository.save(lead);
        return ResponseEntity.ok(ApiResponse.ok("Thank you! We will contact you within 24 hours.", null));
    }

    @GetMapping("/leads")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<WholesaleLead>> getAllLeads() {
        return ResponseEntity.ok(wholesaleLeadRepository.findAllByOrderByCreatedAtDesc());
    }
}
