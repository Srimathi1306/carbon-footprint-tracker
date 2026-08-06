package com.carbonfootprint.footprint_backend.service;

import com.carbonfootprint.footprint_backend.dto.NotificationResponse;
import com.carbonfootprint.footprint_backend.entity.NotificationType;
import com.carbonfootprint.footprint_backend.entity.User;

import java.util.List;

public interface NotificationService {

    void createNotification(User user,
                            NotificationType type,
                            String title,
                            String message,
                            String actionUrl) ;

    List<NotificationResponse> getMyNotifications(String email);

    void markAsRead(Long notificationId);
}