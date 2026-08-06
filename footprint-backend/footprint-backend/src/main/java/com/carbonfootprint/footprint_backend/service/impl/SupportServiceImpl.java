package com.carbonfootprint.footprint_backend.service.impl;

import com.carbonfootprint.footprint_backend.dto.SupportMessageRequest;
import com.carbonfootprint.footprint_backend.dto.SupportMessageResponse;
import com.carbonfootprint.footprint_backend.dto.SupportTicketRequest;
import com.carbonfootprint.footprint_backend.dto.SupportTicketResponse;
import com.carbonfootprint.footprint_backend.entity.*;
import com.carbonfootprint.footprint_backend.repository.SupportMessageRepository;
import com.carbonfootprint.footprint_backend.repository.SupportTicketRepository;
import com.carbonfootprint.footprint_backend.repository.UserRepository;
import com.carbonfootprint.footprint_backend.service.NotificationService;
import com.carbonfootprint.footprint_backend.service.SupportService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SupportServiceImpl implements SupportService {

    private final SupportTicketRepository ticketRepository;

    private final SupportMessageRepository messageRepository;

    private final UserRepository userRepository;

    private final NotificationService notificationService;

    @Override
    public SupportTicketResponse createTicket(
            SupportTicketRequest request,
            String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        SupportTicket ticket = SupportTicket.builder()
                .user(user)
                .category(request.getCategory())
                .priority(request.getPriority())
                .subject(request.getSubject())
                .description(request.getDescription())
                .status(TicketStatus.OPEN)
                .build();

        ticketRepository.save(ticket);

        SupportMessage firstMessage =
                SupportMessage.builder()
                        .ticket(ticket)
                        .sender(user)
                        .senderType(SenderType.USER)
                        .message(request.getDescription())
                        .build();

        messageRepository.save(firstMessage);

        notificationService.createNotification(
                user,
                NotificationType.SUPPORT,
                "Support Ticket Created",
                "Your support ticket has been submitted successfully.",
                "/dashboard/support"
        );

        return mapTicket(ticket);
    }

    @Override
    public List<SupportTicketResponse> getMyTickets(
            String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        return ticketRepository
                .findByUserOrderByCreatedAtDesc(user)
                .stream()
                .map(this::mapTicket)
                .toList();
    }

    @Override
    public SupportTicketResponse getTicket(
            Long ticketId,
            String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        SupportTicket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() ->
                        new RuntimeException("Ticket not found"));

        if (!ticket.getUser().getId().equals(user.getId())
                && user.getRole() != Role.ADMIN) {

            throw new RuntimeException("Unauthorized");

        }

        return mapTicket(ticket);
    }

    @Override
    public SupportMessageResponse sendMessage(
            Long ticketId,
            SupportMessageRequest request,
            String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        SupportTicket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() ->
                        new RuntimeException("Ticket not found"));

        SupportMessage message = SupportMessage.builder()
                .ticket(ticket)
                .sender(user)
                .senderType(SenderType.USER)
                .message(request.getMessage())
                .build();

        messageRepository.save(message);

        notificationService.createNotification(
                user,
                NotificationType.SUPPORT,
                "Support Reply Sent",
                "Your reply has been added to the ticket.",
                "/dashboard/support"
        );

        return mapMessage(message);
    }

    private SupportMessageResponse mapMessage(
            SupportMessage message) {

        return SupportMessageResponse.builder()
                .id(message.getId())
                .senderName(message.getSender().getName())
                .senderType(message.getSenderType())
                .message(message.getMessage())
                .createdAt(message.getCreatedAt())
                .build();

    }

    private SupportTicketResponse mapTicket(
            SupportTicket ticket) {

        List<SupportMessageResponse> messages =
                messageRepository
                        .findByTicketOrderByCreatedAtAsc(ticket)
                        .stream()
                        .map(this::mapMessage)
                        .toList();

        return SupportTicketResponse.builder()
                .id(ticket.getId())
                .category(ticket.getCategory())
                .priority(ticket.getPriority())
                .status(ticket.getStatus())
                .subject(ticket.getSubject())
                .description(ticket.getDescription())
                .createdAt(ticket.getCreatedAt())
                .updatedAt(ticket.getUpdatedAt())
                .messages(messages)
                .build();

    }


    @Override
    public List<SupportTicketResponse> getAllTickets() {

        return ticketRepository.findAll()
                .stream()
                .map(this::mapTicket)
                .toList();

    }

    @Override
    public SupportMessageResponse adminReply(
            Long ticketId,
            SupportMessageRequest request,
            String adminEmail) {

        User admin = userRepository.findByEmail(adminEmail)
                .orElseThrow(() ->
                        new RuntimeException("Admin not found"));

        if (admin.getRole() != Role.ADMIN) {
            throw new RuntimeException("Unauthorized");
        }

        SupportTicket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() ->
                        new RuntimeException("Ticket not found"));

        SupportMessage message = SupportMessage.builder()
                .ticket(ticket)
                .sender(admin)
                .senderType(SenderType.ADMIN)
                .message(request.getMessage())
                .build();

        messageRepository.save(message);

        notificationService.createNotification(
                ticket.getUser(),
                NotificationType.SUPPORT,
                "Support Reply",
                "Admin replied to your support ticket.",
                "/dashboard/support"
        );

        return mapMessage(message);

    }

    @Override
    public SupportTicketResponse updateStatus(
            Long ticketId,
            String status) {

        SupportTicket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() ->
                        new RuntimeException("Ticket not found"));

        ticket.setStatus(
                TicketStatus.valueOf(status.toUpperCase())
        );

        ticketRepository.save(ticket);

        notificationService.createNotification(
                ticket.getUser(),
                NotificationType.SUPPORT,
                "Ticket Status Updated",
                "Your ticket is now " + ticket.getStatus(),
                "/dashboard/support"
        );

        return mapTicket(ticket);

    }

}