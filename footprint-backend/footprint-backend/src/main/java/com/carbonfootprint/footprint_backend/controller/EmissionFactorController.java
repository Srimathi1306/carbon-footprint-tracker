package com.carbonfootprint.footprint_backend.controller;

import com.carbonfootprint.footprint_backend.dto.EmissionFactorRequest;
import com.carbonfootprint.footprint_backend.dto.EmissionFactorResponse;
import com.carbonfootprint.footprint_backend.service.EmissionFactorService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class EmissionFactorController {

    private final EmissionFactorService emissionFactorService;

    public EmissionFactorController(
            EmissionFactorService emissionFactorService
    ) {
        this.emissionFactorService = emissionFactorService;
    }


    // User - get active emission factors
    @GetMapping("/user/emission-factors")
    public ResponseEntity<List<EmissionFactorResponse>> getActiveEmissionFactors() {

        return ResponseEntity.ok(
                emissionFactorService.getActiveEmissionFactors()
        );
    }
    @PostMapping("/user/emission-factors")
    public ResponseEntity<EmissionFactorResponse> createEmissionFactorForUser(
            @RequestBody EmissionFactorRequest request
    ) {

        return new ResponseEntity<>(
                emissionFactorService.createEmissionFactor(request),
                HttpStatus.CREATED
        );
    }


    // Admin - get all emission factors
    @GetMapping("/admin/emission-factors")
    public ResponseEntity<List<EmissionFactorResponse>> getAllEmissionFactors() {

        return ResponseEntity.ok(
                emissionFactorService.getAllEmissionFactors()
        );
    }


    // Admin - get one emission factor
    @GetMapping("/admin/emission-factors/{id}")
    public ResponseEntity<EmissionFactorResponse> getEmissionFactor(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                emissionFactorService.getEmissionFactor(id)
        );
    }


    // Admin - create
    @PostMapping("/admin/emission-factors")
    public ResponseEntity<EmissionFactorResponse> createEmissionFactor(
            @RequestBody EmissionFactorRequest request
    ) {

        return new ResponseEntity<>(
                emissionFactorService.createEmissionFactor(request),
                HttpStatus.CREATED
        );
    }


    // Admin - update
    @PutMapping("/admin/emission-factors/{id}")
    public ResponseEntity<EmissionFactorResponse> updateEmissionFactor(
            @PathVariable Long id,
            @RequestBody EmissionFactorRequest request
    ) {

        return ResponseEntity.ok(
                emissionFactorService.updateEmissionFactor(id, request)
        );
    }


    // Admin - delete
    @DeleteMapping("/admin/emission-factors/{id}")
    public ResponseEntity<String> deleteEmissionFactor(
            @PathVariable Long id
    ) {

        emissionFactorService.deleteEmissionFactor(id);

        return ResponseEntity.ok(
                "Emission factor deleted successfully"
        );
    }
}