package com.carbonfootprint.footprint_backend.repository;

import com.carbonfootprint.footprint_backend.entity.User;
import com.carbonfootprint.footprint_backend.entity.XpTransaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface XpTransactionRepository
        extends JpaRepository<XpTransaction, Long> {

    List<XpTransaction> findByUserOrderByCreatedAtDesc(User user);

}