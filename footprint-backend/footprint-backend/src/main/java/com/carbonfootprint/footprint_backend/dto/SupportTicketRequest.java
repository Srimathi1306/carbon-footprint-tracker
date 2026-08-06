package com.carbonfootprint.footprint_backend.dto;

import com.carbonfootprint.footprint_backend.entity.TicketCategory;
import com.carbonfootprint.footprint_backend.entity.TicketPriority;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SupportTicketRequest {

    private TicketCategory category;

    private TicketPriority priority;

    private String subject;

    private String description;

}
