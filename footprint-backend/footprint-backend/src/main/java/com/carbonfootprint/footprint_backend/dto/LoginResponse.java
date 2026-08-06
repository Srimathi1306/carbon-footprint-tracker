package com.carbonfootprint.footprint_backend.dto;

import com.carbonfootprint.footprint_backend.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponse {

    private String token;
    private String message;
    private UserResponse user;
}