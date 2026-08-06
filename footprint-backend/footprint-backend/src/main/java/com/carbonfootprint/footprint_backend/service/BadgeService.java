package com.carbonfootprint.footprint_backend.service;

import com.carbonfootprint.footprint_backend.entity.Badge;

import java.util.List;

public interface BadgeService {

    void checkBadges(Long userId);

    List<Badge> getUserBadges(String email);

}
