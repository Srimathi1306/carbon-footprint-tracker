package com.carbonfootprint.footprint_backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DailyMission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String title;

    private String description;

    private Integer targetValue;

    private Integer currentValue;

    @Enumerated(EnumType.STRING)
    private MissionStatus status;

    private LocalDate missionDate;
}
