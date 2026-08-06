package com.carbonfootprint.footprint_backend.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AlertResponse {

    private String type;

    private String title;

    private String message;

}
