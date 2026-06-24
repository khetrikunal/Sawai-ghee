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
        double ratePerLitre;
        double planLimitLiters;

        switch (req.getPlanType()) {
            case "5L" -> { ratePerLitre = 2800; planLimitLiters = 5; }
            case "10L" -> { ratePerLitre = 2700; planLimitLiters = 10; }
            case "100L" -> { ratePerLitre = 2500; planLimitLiters = 100; }
            default -> throw new IllegalArgumentException("Invalid planType. Expected 5L, 10L or 100L");
        }

        double totalLiters = (req.getQty200ml() * 0.2)
                + (req.getQty500ml() * 0.5)
                + (req.getQty1L() * 1.0);

        if (totalLiters < 0) {
            throw new IllegalArgumentException("Quantities cannot produce negative liters");
        }
        if (totalLiters > planLimitLiters + 1e-9) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Requested bottles exceed selected plan limit."));
        }

        double totalPrice = totalLiters * ratePerLitre;

        WholesaleLead lead = new WholesaleLead();
        lead.setName(req.getName());
        lead.setPhone(req.getPhone());
        lead.setEmail(req.getEmail());

        lead.setPlanType(req.getPlanType());
        lead.setQty200ml(req.getQty200ml());
        lead.setQty500ml(req.getQty500ml());
        lead.setQty1L(req.getQty1L());
        lead.setTotalLiters(totalLiters);
        lead.setTotalPrice(totalPrice);

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
