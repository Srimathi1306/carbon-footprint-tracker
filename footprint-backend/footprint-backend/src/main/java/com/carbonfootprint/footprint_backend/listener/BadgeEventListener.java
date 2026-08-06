package com.carbonfootprint.footprint_backend.listener;

import com.carbonfootprint.footprint_backend.event.BadgeEvent;
import com.carbonfootprint.footprint_backend.service.BadgeService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class BadgeEventListener {

    private final BadgeService badgeService;

    @EventListener
    public void handleBadgeEvent(BadgeEvent event) {

        System.out.println("Badge Event Received for user: " + event.getUserId());

        badgeService.checkBadges(event.getUserId());
    }
}