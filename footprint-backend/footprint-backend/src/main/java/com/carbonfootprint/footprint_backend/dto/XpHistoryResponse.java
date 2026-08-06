package com.carbonfootprint.footprint_backend.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class XpHistoryResponse {

    private Integer xp;

    private String reason;

    private String createdAt;

}