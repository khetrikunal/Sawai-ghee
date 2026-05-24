package com.sawai.ghee.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "wholesale_leads")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WholesaleLead {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String phone;

    private String email;
    private String quantity;
    private String businessType;
    private String city;

    @Column(columnDefinition = "TEXT")
    private String message;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private LeadStatus status = LeadStatus.NEW;

    @CreationTimestamp
    private LocalDateTime createdAt;

    public enum LeadStatus { NEW, CONTACTED, CONVERTED, CLOSED }
}
