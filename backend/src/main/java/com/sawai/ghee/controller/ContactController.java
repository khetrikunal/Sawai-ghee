package com.sawai.ghee.controller;

import com.sawai.ghee.dto.ApiResponse;
import com.sawai.ghee.dto.ContactRequest;
import com.sawai.ghee.service.EmailService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
@RequiredArgsConstructor
public class ContactController {

    private final EmailService emailService;

    @PostMapping
    public ResponseEntity<ApiResponse<String>> submitContact(@Valid @RequestBody ContactRequest req) {
        emailService.sendContactMessage(req.getName(), req.getEmail(), req.getPhone(), req.getMessage());
        return ResponseEntity.ok(ApiResponse.ok("Message sent! We will get back to you within 24 hours.", null));
    }
}
