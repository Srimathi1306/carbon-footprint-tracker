package com.carbonfootprint.footprint_backend.service;

import com.carbonfootprint.footprint_backend.dto.EmissionFactorRequest;
import com.carbonfootprint.footprint_backend.dto.EmissionFactorResponse;
import com.carbonfootprint.footprint_backend.entity.EmissionFactor;

import java.util.List;

public interface EmissionFactorService {

    // Used internally by ActivityService
    EmissionFactor getEmissionFactorById(Long id);

    // User side
    List<EmissionFactorResponse> getActiveEmissionFactors();

    // Admin side
    List<EmissionFactorResponse> getAllEmissionFactors();

    EmissionFactorResponse getEmissionFactor(Long id);

    EmissionFactorResponse createEmissionFactor(
            EmissionFactorRequest request
    );

    EmissionFactorResponse updateEmissionFactor(
            Long id,
            EmissionFactorRequest request
    );

    void deleteEmissionFactor(Long id);

}