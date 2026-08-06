package com.carbonfootprint.footprint_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminCategoryAnalyticsResponse {

    private String category;
    private Double totalEmission;
}