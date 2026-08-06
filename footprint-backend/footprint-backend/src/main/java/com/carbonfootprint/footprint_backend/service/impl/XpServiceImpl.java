package com.carbonfootprint.footprint_backend.service.impl;


import com.carbonfootprint.footprint_backend.dto.XpHistoryResponse;
import com.carbonfootprint.footprint_backend.entity.User;
import com.carbonfootprint.footprint_backend.entity.XpTransaction;
import com.carbonfootprint.footprint_backend.repository.UserRepository;
import com.carbonfootprint.footprint_backend.repository.XpTransactionRepository;
import com.carbonfootprint.footprint_backend.service.XpService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class XpServiceImpl implements XpService {

    private final UserRepository userRepository;
    private final XpTransactionRepository xpTransactionRepository;

    @Override
    public void addXp(User user, Integer xp, String reason) {

        user.setXp(user.getXp() + xp);

        userRepository.save(user);

        XpTransaction transaction = XpTransaction.builder()
                .user(user)
                .xp(xp)
                .reason(reason)
                .build();

        xpTransactionRepository.save(transaction);
    }

    @Override
    public List<XpHistoryResponse> getHistory(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return xpTransactionRepository.findByUserOrderByCreatedAtDesc(user)
                .stream()
                .map(t -> XpHistoryResponse.builder()
                        .xp(t.getXp())
                        .reason(t.getReason())
                        .createdAt(t.getCreatedAt().toString())
                        .build())
                .toList();
    }

    @Override
    public Integer getTotalXp(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        return user.getXp();

    }
}
