package com.carbonfootprint.footprint_backend.service.impl;

import com.carbonfootprint.footprint_backend.dto.*;
import com.carbonfootprint.footprint_backend.entity.Activity;
import com.carbonfootprint.footprint_backend.entity.GoalStatus;
import com.carbonfootprint.footprint_backend.entity.User;
import com.carbonfootprint.footprint_backend.repository.ActivityRepository;
import com.carbonfootprint.footprint_backend.repository.BadgeRepository;
import com.carbonfootprint.footprint_backend.repository.GoalRepository;
import com.carbonfootprint.footprint_backend.repository.UserRepository;
import com.carbonfootprint.footprint_backend.security.JwtService;
import com.carbonfootprint.footprint_backend.service.UserService;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Builder
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final ActivityRepository activityRepository;
    private final BadgeRepository badgeRepository;
    private final GoalRepository goalRepository;


    @Override
    public UserResponse register(RegisterRequest request) {

        if (repository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        if (repository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username already exists");
        }

        User user = new User();

        user.setName(request.getName());
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole());

        return mapToUserResponse(repository.save(user));
    }

    @Override
    public LoginResponse login(LoginRequest request) {

        User user = repository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid Email"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid Password");
        }

        //String token = jwtService.generateToken(user.getEmail());

        String token = jwtService.generateToken(
                user.getEmail(),
                user.getRole().name()
        );

        return new LoginResponse(
                token,
                "Login Successful",
                mapToUserResponse(user)
        );
    }

    @Override
    public List<UserResponse> getAllUsers() {

        return repository.findAll()
                .stream()
                .map(this::mapToUserResponse)
                .toList();
    }

    @Override
    public UserResponse getUserById(Long id) {

        User user=repository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return mapToUserResponse(user);

    }

    @Override
    public UserResponse updateUser(Long id, UpdateUserRequest request) {

        User user = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        if (!user.getEmail().equals(request.getEmail())
                && repository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
        if (!user.getUsername().equals(request.getUsername())
                && repository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username already exists");
        }
        user.setName(request.getName());
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setRole(request.getRole());

//        if (request.getPassword() != null && !request.getPassword().isBlank()) {
//            user.setPassword(passwordEncoder.encode(request.getPassword()));
//        }

        return mapToUserResponse(repository.save(user));
    }

    @Override
    public void deleteUser(Long id) {

        if (!repository.existsById(id)) {
            throw new RuntimeException("User not found");
        }

        repository.deleteById(id);
    }

    @Override
    public UserResponse getUserByEmail(String email) {

        User user = repository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        return mapToUserResponse(user);
    }

    @Override
    public UserResponse updateProfile(String email,
                                      UpdateProfileRequest request) {

        User user = repository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        if (!user.getEmail().equals(request.getEmail())
                && repository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
        if (!user.getUsername().equals(request.getUsername())
                && repository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username already exists");
        }

        user.setName(request.getName());
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());

        if(request.getPassword()!=null &&
                !request.getPassword().isBlank()){

            user.setPassword(
                    passwordEncoder.encode(request.getPassword())
            );
        }

        return mapToUserResponse(repository.save(user));
    }

    @Override
    public UserResponse createUser(UserRequestDTO dto) {

        if (repository.existsByUsername(dto.getUsername())) {
            throw new RuntimeException("Username already exists");
        }

        if (repository.existsByEmail(dto.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();

        user.setName(dto.getName());
        user.setUsername(dto.getUsername());
        user.setEmail(dto.getEmail());

        user.setPassword(passwordEncoder.encode(dto.getPassword()));

        user.setRole(dto.getRole());

        return mapToUserResponse(repository.save(user));
    }

    private UserResponse mapToUserResponse(User user) {

        long totalActivities =
                activityRepository.findByUser(user).size();

        double totalCarbonEmission =
                activityRepository.findByUser(user)
                        .stream()
                        .mapToDouble(Activity::getCarbonEmission)
                        .sum();

        int badgeCount =
                badgeRepository.findByUser(user).size();

        int completedGoals =
                (int) goalRepository.findAllByUser(user)
                        .stream()
                        .filter(g -> g.getStatus() == GoalStatus.COMPLETED)
                        .count();

        return UserResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .username(user.getUsername())
                .email(user.getEmail())
                .role(user.getRole().name())

                .xp(user.getXp())
                .currentStreak(user.getCurrentStreak())
                .longestStreak(user.getLongestStreak())

                .totalActivities(totalActivities)

                .totalCarbonEmission(
                        Math.round(totalCarbonEmission * 100.0) / 100.0
                )

                .badgeCount(badgeCount)

                .completedGoals(completedGoals)

                .build();
    }
}
