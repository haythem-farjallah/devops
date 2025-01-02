package com.project.feature.payment.mappers;


import com.project.feature.meal.entities.MealEntity;
import com.project.feature.meal.entities.MenuEntity;
import com.project.feature.meal.repositories.MenuRepositorie;
import com.project.feature.payment.dto.TicketDTO;
import com.project.feature.payment.entities.TicketEntity;
import com.project.feature.payment.enums.PaymentMethod;
import com.project.feature.payment.repositories.TicketRepository;
import com.project.feature.user.entities.CardEntity;
import com.project.feature.user.entities.StudentEntity;
import com.project.feature.user.entities.UserEnity;
import com.project.feature.user.repositories.CardRepository;
import com.project.feature.user.repositories.StudentRepository;
import org.mapstruct.AfterMapping;
import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import java.util.Date;
import java.util.Optional;

@Mapper(componentModel = "spring")
public interface TicketMapper {

    TicketEntity toEntity(TicketDTO ticketDTO);



    TicketDTO toDTO(TicketEntity ticketEntity);


    @AfterMapping
    default void updateCardTicket(TicketDTO ticketDTO, @MappingTarget TicketEntity ticketEntity , @Context MenuRepositorie menuRepositorie, @Context TicketRepository ticketRepository, @Context StudentRepository studentRepository, @Context CardRepository cardRepository) {
        StudentEntity studentEntity = studentRepository.findById(ticketDTO.getStudentId())
                .orElseThrow(()-> new IllegalArgumentException("user not found"));
        MenuEntity menuEntity = menuRepositorie.findById(ticketDTO.getMenuId())
                .orElseThrow(()-> new IllegalArgumentException("menu not found"));
        CardEntity cardEntity = cardRepository.findById(ticketDTO.getCardId())
                .orElseThrow(()-> new IllegalArgumentException("card not found"));

        Optional<TicketEntity> existingTicket = ticketRepository.findByStudentAndMenuAndDate(studentEntity, menuEntity, ticketDTO.getDate());

        if (existingTicket.isPresent()) {
            throw new RuntimeException("Ticket already exists for the given student, menu, and date.");
        }

        if (!cardEntity.isActive())
            throw new IllegalArgumentException("cart is not  active");


        if (ticketDTO.getDate().after(cardEntity.getExpiryDate()))
            throw new IllegalArgumentException("card is expired");

        if (cardEntity.getBalance() < menuEntity.getPrix())
            throw new IllegalArgumentException("card is not enough");

        cardEntity.setBalance(cardEntity.getBalance() - menuEntity.getPrix());
        CardEntity savedCard = cardRepository.save(cardEntity);

        ticketEntity.setMenu(menuEntity);
        ticketEntity.setAmount(menuEntity.getPrix());
        ticketEntity.setStudent(studentEntity);
        ticketEntity.setCard(savedCard);
        ticketEntity.setPaymentMethod(PaymentMethod.CARD);


    }

    @AfterMapping
    default void updateCashTicket(TicketDTO ticketDTO, @MappingTarget TicketEntity ticketEntity , @Context MenuRepositorie menuRepositorie, @Context TicketRepository ticketRepository, @Context StudentRepository studentRepository, @Context CardRepository cardRepository) {
        StudentEntity studentEntity = studentRepository.findById(ticketDTO.getStudentId())
                .orElseThrow(()-> new IllegalArgumentException("user not found"));
        MenuEntity menuEntity = menuRepositorie.findById(ticketDTO.getMenuId())
                .orElseThrow(()-> new IllegalArgumentException("menu not found"));

        Optional<TicketEntity> existingTicket = ticketRepository.findByStudentAndMenuAndDate(studentEntity, menuEntity, ticketDTO.getDate());

        if (existingTicket.isPresent()) {
            throw new RuntimeException("Ticket already exists for the given student, menu, and date.");
        }


        ticketEntity.setMenu(menuEntity);
        ticketEntity.setAmount(menuEntity.getPrix());
        ticketEntity.setStudent(studentEntity);
        ticketEntity.setPaymentMethod(PaymentMethod.CASH);

    }


}
