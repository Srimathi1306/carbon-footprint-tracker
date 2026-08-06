package com.carbonfootprint.footprint_backend.repository;

import com.carbonfootprint.footprint_backend.entity.Badge;
import com.carbonfootprint.footprint_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BadgeRepository extends JpaRepository<Badge, Long> {

    List<Badge> findByUser(User user);

    Optional<Badge> findByUserAndBadgeName(User user, String badgeName);

}