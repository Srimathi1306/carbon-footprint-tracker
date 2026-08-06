package com.carbonfootprint.footprint_backend.dto;

import com.carbonfootprint.footprint_backend.entity.NotificationType;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NotificationResponse {

    private Long id;

    private String title;

    private String message;

    private Boolean isRead;

    private LocalDateTime createdAt;

    private NotificationType type;

    private String actionUrl;
}