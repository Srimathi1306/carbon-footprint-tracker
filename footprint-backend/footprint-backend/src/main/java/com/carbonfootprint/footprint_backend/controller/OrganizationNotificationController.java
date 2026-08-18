package com.carbonfootprint.footprint_backend.controller;

import com.carbonfootprint.footprint_backend.dto.NotificationResponse;
import com.carbonfootprint.footprint_backend.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/organization/notifications")
@RequiredArgsConstructor
public class OrganizationNotificationController {

    private final NotificationService notificationService;

    @GetMapping
    public ResponseEntity<List<NotificationResponse>> getNotifications(
            Authentication authentication) {

        return ResponseEntity.ok(
                notificationService.getOrganizationNotifications(
                        authentication.getName()
                )
        );
    }

    @PutMapping("/{id}/read")
    public ResponseEntity<String> markAsRead(
            @PathVariable Long id,
            Authentication authentication) {

        notificationService.markOrganizationNotificationAsRead(
                id,
                authentication.getName()
        );

        return ResponseEntity.ok(
                "Notification marked as read"
        );
    }
}
