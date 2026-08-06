package com.carbonfootprint.footprint_backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EmissionFactorRequest {

    @NotNull(message = "Category is required")
    private Long categoryId;

    @NotBlank(message = "Activity type is required")
    private String activityType;

    @NotBlank(message = "Unit is required")
    private String unit;

    @NotNull(message = "Emission factor is required")
    private Double emissionFactor;

    @NotNull(message = "Status is required")
    private Boolean status;
}
