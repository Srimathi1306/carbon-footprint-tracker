package com.carbonfootprint.footprint_backend.repository;


import com.carbonfootprint.footprint_backend.entity.Goal;
import com.carbonfootprint.footprint_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface GoalRepository extends JpaRepository<Goal, Long> {

    Optional<Goal> findByUser(User user);

    List<Goal> findAllByUser(User user);

}