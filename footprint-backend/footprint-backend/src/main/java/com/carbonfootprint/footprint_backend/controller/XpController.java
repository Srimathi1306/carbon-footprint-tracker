package com.carbonfootprint.footprint_backend.controller;

import com.carbonfootprint.footprint_backend.dto.XpHistoryResponse;
import com.carbonfootprint.footprint_backend.service.XpService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/xp")
@RequiredArgsConstructor
public class XpController {

    private final XpService xpService;

    @GetMapping("/history")
    public ResponseEntity<List<XpHistoryResponse>> getHistory(
            Authentication authentication) {

        return ResponseEntity.ok(
                xpService.getHistory(authentication.getName())
        );
    }

    @GetMapping("/me")
    public ResponseEntity<Integer> getXp(
            Authentication authentication) {

        return ResponseEntity.ok(
                xpService.getTotalXp(authentication.getName())
        );
    }

}