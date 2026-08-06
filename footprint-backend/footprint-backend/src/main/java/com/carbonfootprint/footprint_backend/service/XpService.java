package com.carbonfootprint.footprint_backend.service;

import com.carbonfootprint.footprint_backend.dto.XpHistoryResponse;
import com.carbonfootprint.footprint_backend.entity.User;

import java.util.List;

public interface XpService {

    void addXp(User user, Integer xp, String reason);

    List<XpHistoryResponse> getHistory(String email);

    Integer getTotalXp(String email);

}
