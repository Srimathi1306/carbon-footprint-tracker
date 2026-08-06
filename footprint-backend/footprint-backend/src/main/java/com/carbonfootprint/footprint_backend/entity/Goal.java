package com.carbonfootprint.footprint_backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "goals")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Goal extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    // Sum of previous N days
    private Double baselineEmission;

    // Baseline - reduction %
    private Double targetEmission;

    // Running total during goal period
    private Double currentEmission;

    // User selected value
    private Double reductionPercentage;

    // User selected duration (5,7,15,30)
    private Integer durationDays;

    private LocalDate startDate;

    private LocalDate endDate;

    @Enumerated(EnumType.STRING)
    private GoalStatus status;
}
