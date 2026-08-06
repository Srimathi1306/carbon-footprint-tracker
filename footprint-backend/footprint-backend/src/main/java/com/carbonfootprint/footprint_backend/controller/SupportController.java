package com.carbonfootprint.footprint_backend.controller;

import com.carbonfootprint.footprint_backend.dto.SupportMessageRequest;
import com.carbonfootprint.footprint_backend.dto.SupportMessageResponse;
import com.carbonfootprint.footprint_backend.dto.SupportTicketRequest;
import com.carbonfootprint.footprint_backend.dto.SupportTicketResponse;
import com.carbonfootprint.footprint_backend.service.SupportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/support")
@RequiredArgsConstructor
public class SupportController {

    private final SupportService supportService;

    // Create Ticket
    @PostMapping
    public ResponseEntity<SupportTicketResponse> createTicket(
            @RequestBody SupportTicketRequest request,
            Authentication authentication) {

        return ResponseEntity.ok(
                supportService.createTicket(
                        request,
                        authentication.getName()
                )
        );
    }

    // Get Logged-in User Tickets
    @GetMapping("/my-tickets")
    public ResponseEntity<List<SupportTicketResponse>> getMyTickets(
            Authentication authentication) {

        return ResponseEntity.ok(
                supportService.getMyTickets(
                        authentication.getName()
                )
        );
    }

    // Get Single Ticket with Conversation
    @GetMapping("/{ticketId}")
    public ResponseEntity<SupportTicketResponse> getTicket(
            @PathVariable Long ticketId,
            Authentication authentication) {

        return ResponseEntity.ok(
                supportService.getTicket(
                        ticketId,
                        authentication.getName()
                )
        );
    }

    // User Sends Message
    @PostMapping("/{ticketId}/message")
    public ResponseEntity<SupportMessageResponse> sendMessage(
            @PathVariable Long ticketId,
            @RequestBody SupportMessageRequest request,
            Authentication authentication) {

        return ResponseEntity.ok(
                supportService.sendMessage(
                        ticketId,
                        request,
                        authentication.getName()
                )
        );
    }
}
