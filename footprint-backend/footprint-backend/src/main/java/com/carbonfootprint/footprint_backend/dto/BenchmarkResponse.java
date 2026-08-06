package com.carbonfootprint.footprint_backend.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BenchmarkResponse {

    private String category;

    private Double userEmission;

    private Double platformAverage;

    private Double percentile;

    private String performance;

}