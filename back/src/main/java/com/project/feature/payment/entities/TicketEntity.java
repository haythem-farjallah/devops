package com.project.feature.payment.entities;


import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.project.feature.meal.entities.MenuEntity;
import com.project.feature.payment.enums.PaymentMethod;
import com.project.feature.user.entities.CardEntity;
import com.project.feature.user.entities.StudentEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@EntityListeners(AuditingEntityListener.class)
@Entity
@Table(name = "ticket")
public class TicketEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;



    private double amount;

    private Date date;

    @Enumerated(EnumType.STRING)
    private PaymentMethod paymentMethod = PaymentMethod.CARD;




    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    @JsonManagedReference
    private StudentEntity student;


    @ManyToOne
    @JoinColumn(name = "card_id")
    @JsonManagedReference
    private CardEntity card;


    @ManyToOne
    @JsonManagedReference
    @JoinColumn(name = "menu_id", nullable = false)
    private MenuEntity menu;

    @CreatedDate
    private Date createdAt;

    @LastModifiedDate
    private Date updatedAt;

}
