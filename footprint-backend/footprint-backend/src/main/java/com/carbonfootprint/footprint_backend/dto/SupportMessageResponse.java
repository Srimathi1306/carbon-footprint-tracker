package com.carbonfootprint.footprint_backend.dto;
import com.carbonfootprint.footprint_backend.entity.SenderType;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SupportMessageResponse {

    private Long id;

    private String senderName;

    private SenderType senderType;

    private String message;

    private LocalDateTime createdAt;

}