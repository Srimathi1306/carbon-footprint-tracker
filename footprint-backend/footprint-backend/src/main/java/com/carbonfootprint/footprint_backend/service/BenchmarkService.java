package com.carbonfootprint.footprint_backend.service;

import com.carbonfootprint.footprint_backend.dto.BenchmarkResponse;

import java.util.List;

public interface BenchmarkService {

    List<BenchmarkResponse> getBenchmark(String email);
}
