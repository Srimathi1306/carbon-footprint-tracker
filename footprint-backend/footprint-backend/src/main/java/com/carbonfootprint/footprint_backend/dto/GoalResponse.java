package com.carbonfootprint.footprint_backend.dto;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GoalResponse {

    private String category;

    private Double baselineEmission;

    private Double targetEmission;

    private Double currentEmission;

    private Double reductionPercentage;

    private LocalDate startDate;

    private LocalDate endDate;

    private Double progressPercentage;

    private Double remainingEmission;

    private Long daysLeft;

    private Long goalId;

    private String status;

    private Integer durationDays;

}
