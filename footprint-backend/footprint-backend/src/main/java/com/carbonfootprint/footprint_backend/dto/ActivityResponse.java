package com.carbonfootprint.footprint_backend.dto;

import com.carbonfootprint.footprint_backend.entity.Category;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class ActivityResponse {

    private Long id;

    private Long emissionFactorId;

    private String userName;

    private String category;

    private String activityType;

    private String unit;

    private Double quantity;

    private Double carbonEmission;

    private LocalDate activityDate;
}