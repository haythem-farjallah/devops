package com.project.feature.meal.repositories;

import com.project.feature.meal.entities.ScheduleEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.repository.support.Repositories;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface ScheduleRepositorie extends JpaRepository<ScheduleEntity,Long> , JpaSpecificationExecutor<ScheduleEntity> {
    Optional<ScheduleEntity> findFirstByActiveTrue();
    Optional<ScheduleEntity> findByDate(Date date);
    List<ScheduleEntity> findByDateBetween(Date startDate, Date endDate);

    @Query("SELECT m.date FROM ScheduleEntity m WHERE m.date IN :dates")
    List<Date> findExistingDates(@Param("dates") List<Date> dates);
}
