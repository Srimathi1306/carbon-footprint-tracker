package com.carbonfootprint.footprint_backend.controller;

import com.carbonfootprint.footprint_backend.entity.Badge;
import com.carbonfootprint.footprint_backend.service.BadgeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/badges")
@RequiredArgsConstructor
public class BadgeController {

    private final BadgeService badgeService;

    @GetMapping
    public ResponseEntity<List<Badge>> getMyBadges(
            Authentication authentication){

        return ResponseEntity.ok(
                badgeService.getUserBadges(authentication.getName())
        );

    }

}
