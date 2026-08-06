package com.carbonfootprint.footprint_backend.service.impl;

import com.carbonfootprint.footprint_backend.dto.NotificationResponse;
import com.carbonfootprint.footprint_backend.entity.Notification;
import com.carbonfootprint.footprint_backend.entity.NotificationType;
import com.carbonfootprint.footprint_backend.entity.User;
import com.carbonfootprint.footprint_backend.repository.NotificationRepository;
import com.carbonfootprint.footprint_backend.repository.UserRepository;
import com.carbonfootprint.footprint_backend.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;

    @Override
    public void createNotification(User user,
                                   NotificationType type,
                                   String title,
                                   String message,
                                   String actionUrl) {

        Notification notification = Notification.builder()
                .user(user)
                .type(type)
                .title(title)
                .message(message)
                .actionUrl(actionUrl)
                .isRead(false)
                .createdAt(LocalDateTime.now())
                .build();

        notificationRepository.save(notification);
    }

    @Override
    public List<NotificationResponse> getMyNotifications(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return notificationRepository.findByUserOrderByCreatedAtDesc(user)
                .stream()
                .map(notification -> NotificationResponse.builder()
                        .id(notification.getId())
                        .title(notification.getTitle())
                        .message(notification.getMessage())
                        .isRead(notification.getIsRead())
                        .createdAt(notification.getCreatedAt())
                        .type(notification.getType())
                        .actionUrl(notification.getActionUrl())
                        .build())
                .toList();
    }

    @Override
    public void markAsRead(Long notificationId) {

        Notification notification =
                notificationRepository.findById(notificationId)
                        .orElseThrow(() -> new RuntimeException("Notification not found"));

        notification.setIsRead(true);

        notificationRepository.save(notification);
    }
}