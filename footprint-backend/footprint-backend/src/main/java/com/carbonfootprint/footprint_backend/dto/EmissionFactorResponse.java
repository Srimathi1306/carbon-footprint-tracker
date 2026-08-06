package com.carbonfootprint.footprint_backend.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class EmissionFactorResponse {

    private Long id;

    private Long categoryId;

    private String categoryName;

    private String activityType;

    private String unit;

    private Double emissionFactor;

    private Boolean status;
}
