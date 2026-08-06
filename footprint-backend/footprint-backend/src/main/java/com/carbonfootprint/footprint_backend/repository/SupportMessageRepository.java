package com.carbonfootprint.footprint_backend.repository;

import com.carbonfootprint.footprint_backend.entity.SupportMessage;
import com.carbonfootprint.footprint_backend.entity.SupportTicket;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SupportMessageRepository
        extends JpaRepository<SupportMessage, Long> {

    List<SupportMessage> findByTicketOrderByCreatedAtAsc(
            SupportTicket ticket
    );

}