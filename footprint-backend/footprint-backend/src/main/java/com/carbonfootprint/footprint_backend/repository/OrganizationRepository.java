package com.carbonfootprint.footprint_backend.repository;

import com.carbonfootprint.footprint_backend.entity.Organization;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface OrganizationRepository
        extends JpaRepository<Organization, Long> {

    Optional<Organization> findByEmail(String email);

    boolean existsByEmail(String email);
}
