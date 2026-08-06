package com.carbonfootprint.footprint_backend.dto;

import com.carbonfootprint.footprint_backend.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateUserRequest {

    private String name;

    private String username;

    private String email;

    private Role role;

}
