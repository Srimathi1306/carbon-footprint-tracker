package com.carbonfootprint.footprint_backend.repository;

import com.carbonfootprint.footprint_backend.entity.Activity;
import com.carbonfootprint.footprint_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ActivityRepository extends JpaRepository<Activity, Long> {

    List<Activity> findByUser(User user);

    Long countByUserId(Long userId);

    @Query("SELECT COALESCE(SUM(a.carbonEmission), 0) FROM Activity a")
    Double getTotalCarbonEmission();

    @Query("SELECT AVG(a.carbonEmission) FROM Activity a")
    Double getAverageCarbonEmission();

    @Query("""
SELECT a
FROM Activity a
JOIN FETCH a.emissionFactor ef
JOIN FETCH ef.category
""")
    List<Activity> findAllWithCategory();

    @Query("""
SELECT a
FROM Activity a
JOIN FETCH a.emissionFactor ef
JOIN FETCH ef.category
WHERE a.user.id = :userId
""")
    List<Activity> findAllWithCategoryByUserId(@Param("userId") Long userId);


    @Query("""
SELECT COALESCE(SUM(a.carbonEmission), 0)
FROM Activity a
WHERE a.user.id = :userId
AND a.activityDate BETWEEN :startDate AND :endDate
""")
    Double getTotalCarbonEmissionByUserAndDateRange(
            @Param("userId") Long userId,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate
    );


    @Query("""
SELECT
c.name,
AVG(a.carbonEmission)
FROM Activity a
JOIN a.emissionFactor ef
JOIN ef.category c
WHERE a.activityDate BETWEEN :startDate AND :endDate
GROUP BY c.name
""")
    List<Object[]> getPlatformAverageByCategory(
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate
    );

    @Query("""
SELECT
c.name,
SUM(a.carbonEmission)
FROM Activity a
JOIN a.emissionFactor ef
JOIN ef.category c
WHERE a.user.id = :userId
AND a.activityDate BETWEEN :startDate AND :endDate
GROUP BY c.name
""")
    List<Object[]> getUserEmissionByCategory(
            @Param("userId") Long userId,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate
    );

    @Query("""
SELECT
a.user.id,
c.name,
SUM(a.carbonEmission)
FROM Activity a
JOIN a.emissionFactor ef
JOIN ef.category c
WHERE a.activityDate BETWEEN :startDate AND :endDate
GROUP BY a.user.id, c.name
""")
    List<Object[]> getAllUsersCategoryEmission(
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate
    );

    @Query("""
SELECT COALESCE(SUM(a.carbonEmission), 0)
FROM Activity a
WHERE a.user.id = :userId
AND a.emissionFactor.category.id = :categoryId
AND a.activityDate BETWEEN :startDate AND :endDate
""")
    Double getTotalEmissionForCategoryBetweenDates(
            @Param("userId") Long userId,
            @Param("categoryId") Long categoryId,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate
    );

    List<Activity> findTop5ByOrderByCreatedAtDesc();

    @Query("""
SELECT COALESCE(SUM(a.carbonEmission),0)
FROM Activity a
WHERE a.user.id = :userId
AND a.activityDate = :date
""")
    Double getEmissionByDate(
            @Param("userId") Long userId,
            @Param("date") LocalDate date
    );

    @Query("""
SELECT COUNT(a)
FROM Activity a
WHERE a.user.id = :userId
AND a.activityDate = :date
""")
    Long countActivitiesByDate(
            @Param("userId") Long userId,
            @Param("date") LocalDate date
    );

    @Query("""
SELECT COALESCE(SUM(a.carbonEmission),0)
FROM Activity a
WHERE a.user.id = :userId
""")
    Double getUserTotalEmission(
            @Param("userId") Long userId
    );



}