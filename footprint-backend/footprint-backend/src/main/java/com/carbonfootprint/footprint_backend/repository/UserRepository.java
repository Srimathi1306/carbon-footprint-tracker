package com.carbonfootprint.footprint_backend.repository;

import com.carbonfootprint.footprint_backend.entity.Organization;
import com.carbonfootprint.footprint_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);
    List<User> findTop5ByOrderByIdDesc();
    List<User> findByOrganization(Organization organization);
    long countByOrganization(Organization organization);
    boolean existsByEmail(String email);
    boolean existsByUsername(String username);

}
