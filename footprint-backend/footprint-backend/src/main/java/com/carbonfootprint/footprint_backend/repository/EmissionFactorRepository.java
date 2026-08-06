package com.carbonfootprint.footprint_backend.repository;

import com.carbonfootprint.footprint_backend.entity.Category;
import com.carbonfootprint.footprint_backend.entity.EmissionFactor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EmissionFactorRepository extends JpaRepository<EmissionFactor, Long> {

    List<EmissionFactor> findByCategory(Category category);

    List<EmissionFactor> findByStatusTrue();

    List<EmissionFactor> findByCategoryAndStatusTrue(Category category);

    Optional<EmissionFactor> findByCategoryAndActivityType(
            Category category,
            String activityType
    );

    boolean existsByCategoryAndActivityType(
            Category category,
            String activityType
    );
}