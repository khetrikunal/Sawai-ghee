package com.sawai.ghee.controller;

import com.sawai.ghee.dto.*;
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
        WholesaleLead lead = new WholesaleLead();
        lead.setName(req.getName());
        lead.setPhone(req.getPhone());
        lead.setEmail(req.getEmail());
        lead.setQuantity(req.getQuantity());
        lead.setBusinessType(req.getBusinessType());
        lead.setCity(req.getCity());
        lead.setMessage(req.getMessage());
        lead.setStatus(WholesaleLead.LeadStatus.NEW);
        wholesaleLeadRepository.save(lead);
        return ResponseEntity.ok(ApiResponse.ok("Thank you! We will contact you within 24 hours.", null));
    }

    @GetMapping("/leads")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<WholesaleLead>> getAllLeads() {
        return ResponseEntity.ok(wholesaleLeadRepository.findAllByOrderByCreatedAtDesc());
    }

    @PatchMapping("/leads/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<String>> updateLeadStatus(
            @PathVariable Long id,
            @RequestBody OrderStatusRequest req) {
        return wholesaleLeadRepository.findById(id).map(l -> {
            l.setStatus(WholesaleLead.LeadStatus.valueOf(req.getStatus().toUpperCase()));
            wholesaleLeadRepository.save(l);
            return ResponseEntity.ok(ApiResponse.ok("Lead status updated successfully", (String) null));
        }).orElse(ResponseEntity.notFound().build());
    }
}
