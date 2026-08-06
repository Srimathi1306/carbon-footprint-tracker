package com.carbonfootprint.footprint_backend.controller;

import com.carbonfootprint.footprint_backend.dto.SupportMessageRequest;
import com.carbonfootprint.footprint_backend.dto.SupportMessageResponse;
import com.carbonfootprint.footprint_backend.dto.SupportTicketResponse;
import com.carbonfootprint.footprint_backend.dto.TicketStatusRequest;
import com.carbonfootprint.footprint_backend.service.SupportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/support")
@RequiredArgsConstructor
public class AdminSupportController {

    private final SupportService supportService;

    @GetMapping
    public ResponseEntity<List<SupportTicketResponse>> getAllTickets() {

        return ResponseEntity.ok(
                supportService.getAllTickets()
        );

    }

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

    @PostMapping("/{ticketId}/reply")
    public ResponseEntity<SupportMessageResponse> reply(
            @PathVariable Long ticketId,
            @RequestBody SupportMessageRequest request,
            Authentication authentication) {

        return ResponseEntity.ok(
                supportService.adminReply(
                        ticketId,
                        request,
                        authentication.getName()
                )
        );

    }

    @PutMapping("/{ticketId}/status")
    public ResponseEntity<SupportTicketResponse> updateStatus(
            @PathVariable Long ticketId,
            @RequestBody TicketStatusRequest request) {

        return ResponseEntity.ok(
                supportService.updateStatus(
                        ticketId,
                        request.getStatus()
                )
        );

    }

}