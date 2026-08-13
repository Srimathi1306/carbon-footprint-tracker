package com.carbonfootprint.footprint_backend.service.impl;

import com.carbonfootprint.footprint_backend.dto.OrganizationDashboardResponse;
import com.carbonfootprint.footprint_backend.dto.UpdateUserRequest;
import com.carbonfootprint.footprint_backend.dto.UserRequestDTO;
import com.carbonfootprint.footprint_backend.dto.UserResponse;
import com.carbonfootprint.footprint_backend.entity.Organization;
import com.carbonfootprint.footprint_backend.entity.Role;
import com.carbonfootprint.footprint_backend.entity.User;
import com.carbonfootprint.footprint_backend.repository.*;
import com.carbonfootprint.footprint_backend.service.OrganizationDashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrganizationDashboardServiceImpl
        implements OrganizationDashboardService {

    private final OrganizationRepository organizationRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    private final ActivityRepository activityRepository;
    private final BadgeRepository badgeRepository;
    private final GoalRepository goalRepository;

    @Override
    public OrganizationDashboardResponse getDashboard(
            String organizationEmail) {

        Organization organization =
                organizationRepository.findByEmail(organizationEmail)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Organization not found"
                                ));

        Long organizationId = organization.getId();

        Long totalUsers =
                userRepository.countByOrganization(organization);

        Long totalActivities =
                activityRepository.countByOrganizationId(organizationId);

        Double totalCarbonEmission =
                activityRepository
                        .getTotalCarbonEmissionByOrganizationId(
                                organizationId
                        );

        Long totalBadges =
                badgeRepository.countByOrganizationId(
                        organizationId
                );

        Long completedGoals =
                goalRepository.countCompletedByOrganizationId(
                        organizationId
                );

        return OrganizationDashboardResponse.builder()
                .organizationId(organization.getId())
                .organizationName(organization.getName())
                .organizationEmail(organization.getEmail())
                .totalUsers(totalUsers)
                .totalActivities(totalActivities)
                .totalCarbonEmission(
                        Math.round(totalCarbonEmission * 100.0) / 100.0
                )
                .totalBadges(totalBadges)
                .completedGoals(completedGoals)
                .build();
    }

    @Override
    public List<UserResponse> getUsers(String organizationEmail) {

        Organization organization =
                organizationRepository.findByEmail(organizationEmail)
                        .orElseThrow(() ->
                                new RuntimeException("Organization not found"));

        return userRepository
                .findByOrganization(organization)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public UserResponse createUser(
            String organizationEmail,
            UserRequestDTO request) {

        Organization organization =
                organizationRepository.findByEmail(organizationEmail)
                        .orElseThrow(() ->
                                new RuntimeException("Organization not found"));

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username already exists");
        }

        User user = new User();

        user.setName(request.getName());
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());

        user.setPassword(
                passwordEncoder.encode(request.getPassword())
        );

        // Organization Admin can create only normal users
        user.setRole(Role.USER);

        // Automatically associate user with logged-in organization
        user.setOrganization(organization);

        User savedUser = userRepository.save(user);

        return mapToResponse(savedUser);
    }

    @Override
    public UserResponse getUser(
            String organizationEmail,
            Long userId) {

        Organization organization =
                organizationRepository.findByEmail(organizationEmail)
                        .orElseThrow(() ->
                                new RuntimeException("Organization not found"));

        User user = getUserFromOrganization(
                organization,
                userId
        );

        return mapToResponse(user);
    }

    @Override
    public UserResponse updateUser(
            String organizationEmail,
            Long userId,
            UpdateUserRequest request) {

        Organization organization =
                organizationRepository.findByEmail(organizationEmail)
                        .orElseThrow(() ->
                                new RuntimeException("Organization not found"));

        User user = getUserFromOrganization(
                organization,
                userId
        );

        if (!user.getEmail().equals(request.getEmail())
                && userRepository.existsByEmail(request.getEmail())) {

            throw new RuntimeException("Email already exists");
        }

        if (!user.getUsername().equals(request.getUsername())
                && userRepository.existsByUsername(request.getUsername())) {

            throw new RuntimeException("Username already exists");
        }

        user.setName(request.getName());
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());

        // Organization Admin cannot change user role.
        user.setRole(Role.USER);

        return mapToResponse(
                userRepository.save(user)
        );
    }

    @Override
    public void deleteUser(
            String organizationEmail,
            Long userId) {

        Organization organization =
                organizationRepository.findByEmail(organizationEmail)
                        .orElseThrow(() ->
                                new RuntimeException("Organization not found"));

        User user = getUserFromOrganization(
                organization,
                userId
        );

        userRepository.delete(user);
    }

    /**
     * Finds a user and verifies that the user belongs
     * to the currently authenticated organization.
     */
    private User getUserFromOrganization(
            Organization organization,
            Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        if (user.getOrganization() == null
                || !user.getOrganization()
                .getId()
                .equals(organization.getId())) {

            throw new RuntimeException(
                    "User does not belong to this organization"
            );
        }

        return user;
    }

    private UserResponse mapToResponse(User user) {

        return UserResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .username(user.getUsername())
                .email(user.getEmail())
                .role(user.getRole().name())
                .xp(user.getXp())
                .currentStreak(user.getCurrentStreak())
                .longestStreak(user.getLongestStreak())
                .totalActivities(0L)
                .totalCarbonEmission(0.0)
                .badgeCount(0)
                .completedGoals(0)
                .build();
    }
}