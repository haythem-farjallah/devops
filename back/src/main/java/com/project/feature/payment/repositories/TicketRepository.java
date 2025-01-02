package com.project.feature.payment.repositories;

import com.project.feature.meal.entities.MenuEntity;
import com.project.feature.payment.entities.TicketEntity;
import com.project.feature.user.entities.CardEntity;
import com.project.feature.user.entities.StudentEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface TicketRepository extends JpaRepository<TicketEntity, Long>, JpaSpecificationExecutor<TicketEntity> {


    List<TicketEntity> findByStudent(StudentEntity studentEntity, Pageable pageable);
    List<TicketEntity> findByMenu(MenuEntity menuEntity, Pageable pageable);
    List<TicketEntity> findByCard(CardEntity cardEntity, Pageable pageable);
    Optional<TicketEntity> findByStudentAndMenuAndDate(StudentEntity student, MenuEntity menu, Date date);
    List<TicketEntity> findByCardIsNull(Pageable pageable);


}
