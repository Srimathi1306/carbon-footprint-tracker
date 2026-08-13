package com.carbonfootprint.footprint_backend.repository;

import com.carbonfootprint.footprint_backend.entity.Badge;
import com.carbonfootprint.footprint_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface BadgeRepository extends JpaRepository<Badge, Long> {

    List<Badge> findByUser(User user);

    Optional<Badge> findByUserAndBadgeName(User user, String badgeName);

    @Query("""
SELECT COUNT(b)
FROM Badge b
WHERE b.user.organization.id = :organizationId
""")
    Long countByOrganizationId(
            @Param("organizationId") Long organizationId
    );

}