package com.carbonfootprint.footprint_backend.dto;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GoalRequest {

    private Long categoryId;

    private Double reductionPercentage;

    private Integer durationDays;

}