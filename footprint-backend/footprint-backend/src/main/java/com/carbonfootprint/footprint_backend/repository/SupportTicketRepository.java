package com.carbonfootprint.footprint_backend.repository;

import com.carbonfootprint.footprint_backend.entity.SupportTicket;
import com.carbonfootprint.footprint_backend.entity.TicketStatus;
import com.carbonfootprint.footprint_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SupportTicketRepository extends JpaRepository<SupportTicket, Long> {

    List<SupportTicket> findByUserOrderByCreatedAtDesc(User user);

    List<SupportTicket> findByStatusOrderByCreatedAtDesc(TicketStatus status);

}
