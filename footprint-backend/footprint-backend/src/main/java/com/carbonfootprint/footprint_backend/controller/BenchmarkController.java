package com.carbonfootprint.footprint_backend.controller;

import com.carbonfootprint.footprint_backend.dto.BenchmarkResponse;
import com.carbonfootprint.footprint_backend.service.BenchmarkService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/benchmark")
@RequiredArgsConstructor
public class BenchmarkController {

    private final BenchmarkService benchmarkService;

    @GetMapping
    public ResponseEntity<List<BenchmarkResponse>> getBenchmark(
            Authentication authentication) {

        return ResponseEntity.ok(
                benchmarkService.getBenchmark(authentication.getName())
        );
    }
}