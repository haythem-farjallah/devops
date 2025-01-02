package com.project.feature.user.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.project.feature.payment.entities.TicketEntity;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@ToString
@Builder
@RequiredArgsConstructor
@Table(name = "cartsBanque")
@EntityListeners(AuditingEntityListener.class)
@AllArgsConstructor
public class CardEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double balance = 0.0;

    private  boolean active = false;

    private  Date activationDate;

    private  Date expiryDate;

    @OneToOne(mappedBy = "cart", optional = false)
    @JsonBackReference
    private StudentEntity student;

    @OneToMany(mappedBy = "card" , cascade = CascadeType.ALL , orphanRemoval = true)
    @JsonBackReference
    private List<TicketEntity> tickets;


    @CreatedDate
    private Date createdAt;

    @LastModifiedDate
    private Date updatedAt;


}
