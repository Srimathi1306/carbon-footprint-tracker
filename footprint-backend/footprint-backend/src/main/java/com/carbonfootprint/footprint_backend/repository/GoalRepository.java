package com.carbonfootprint.footprint_backend.repository;


import com.carbonfootprint.footprint_backend.entity.Goal;
import com.carbonfootprint.footprint_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface GoalRepository extends JpaRepository<Goal, Long> {

    Optional<Goal> findByUser(User user);

    List<Goal> findAllByUser(User user);

    @Query("""
SELECT COUNT(g)
FROM Goal g
WHERE g.user.organization.id = :organizationId
AND g.status = com.carbonfootprint.footprint_backend.entity.GoalStatus.COMPLETED
""")
    Long countCompletedByOrganizationId(
            @Param("organizationId") Long organizationId
    );

}