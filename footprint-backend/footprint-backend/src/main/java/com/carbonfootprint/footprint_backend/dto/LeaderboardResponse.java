package com.carbonfootprint.footprint_backend.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LeaderboardResponse {

    private Integer rank;

    private Long userId;

    private String name;

    private Integer xp;

    private Integer streak;

    private Integer badgeCount;

    private Double totalEmission;

}

