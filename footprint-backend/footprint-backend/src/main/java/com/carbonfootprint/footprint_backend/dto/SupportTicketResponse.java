package com.carbonfootprint.footprint_backend.dto;

import com.carbonfootprint.footprint_backend.entity.TicketCategory;
import com.carbonfootprint.footprint_backend.entity.TicketPriority;
import com.carbonfootprint.footprint_backend.entity.TicketStatus;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SupportTicketResponse {

    private Long id;

    private TicketCategory category;

    private TicketPriority priority;

    private TicketStatus status;

    private String subject;

    private String description;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private List<SupportMessageResponse> messages;

}