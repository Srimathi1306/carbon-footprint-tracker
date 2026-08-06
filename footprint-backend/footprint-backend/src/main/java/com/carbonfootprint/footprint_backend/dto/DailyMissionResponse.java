package com.carbonfootprint.footprint_backend.dto;

import com.carbonfootprint.footprint_backend.entity.MissionStatus;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DailyMissionResponse {

    private Long id;

    private String title;

    private String description;

    private Integer targetValue;

    private Integer currentValue;

    private MissionStatus status;

}