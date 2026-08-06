package com.carbonfootprint.footprint_backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "weekly_missions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WeeklyMission extends BaseEntity {

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

    private LocalDate weekStart;

    private LocalDate weekEnd;
}