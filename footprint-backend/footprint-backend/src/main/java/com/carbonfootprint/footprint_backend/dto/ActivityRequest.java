package com.carbonfootprint.footprint_backend.dto;

import com.carbonfootprint.footprint_backend.entity.Category;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.time.LocalDate;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
public class ActivityRequest {

    @NotNull(message = "Emission factor is required")
    private Long emissionFactorId;

    @NotNull(message = "Quantity is required")
    private Double quantity;

    @NotNull(message = "Activity date is required")
    private LocalDate activityDate;
}