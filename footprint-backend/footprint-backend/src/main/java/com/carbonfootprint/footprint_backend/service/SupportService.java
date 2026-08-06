package com.carbonfootprint.footprint_backend.service;


import com.carbonfootprint.footprint_backend.dto.SupportMessageRequest;
import com.carbonfootprint.footprint_backend.dto.SupportMessageResponse;
import com.carbonfootprint.footprint_backend.dto.SupportTicketRequest;
import com.carbonfootprint.footprint_backend.dto.SupportTicketResponse;

import java.util.List;

public interface SupportService {

    SupportTicketResponse createTicket(
            SupportTicketRequest request,
            String email
    );

    List<SupportTicketResponse> getMyTickets(
            String email
    );

    SupportTicketResponse getTicket(
            Long ticketId,
            String email
    );

    SupportMessageResponse sendMessage(
            Long ticketId,
            SupportMessageRequest request,
            String email
    );

    List<SupportTicketResponse> getAllTickets();

    SupportMessageResponse adminReply(
            Long ticketId,
            SupportMessageRequest request,
            String adminEmail
    );

    SupportTicketResponse updateStatus(
            Long ticketId,
            String status
    );

}