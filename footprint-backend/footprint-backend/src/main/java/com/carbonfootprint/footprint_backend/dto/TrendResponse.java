package com.carbonfootprint.footprint_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TrendResponse {

    private String label;
    private Double emission;

}