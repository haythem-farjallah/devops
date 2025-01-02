package com.project.feature.user.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.project.feature.payment.entities.TicketEntity;
import com.project.feature.user.utils.University;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Entity
@DiscriminatorValue("ROLE_STUDENT")
@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class StudentEntity extends UserEnity {


    private String codeP;

    @Enumerated(EnumType.STRING)
    private University university;

    @OneToOne( cascade = CascadeType.ALL)
    @JsonManagedReference
    private CardEntity cart;

    @OneToMany(mappedBy = "student" , cascade = CascadeType.ALL , orphanRemoval = true)
    @JsonBackReference
    private List<TicketEntity> tickets;

    public StudentEntity(String password, String email, University university) {
        super( email ,password);
        this.university = university;
    }

}
