package com.carbonfootprint.footprint_backend.entity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "xp_transactions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class XpTransaction extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private Integer xp;

    @Column(nullable = false)
    private String reason;

}
