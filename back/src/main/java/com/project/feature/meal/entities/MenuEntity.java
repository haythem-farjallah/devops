package com.project.feature.meal.entities;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.project.feature.payment.entities.TicketEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.Date;
import java.util.List;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@EntityListeners(AuditingEntityListener.class)
@Entity
public class MenuEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Min(value = 0L, message = "The value must be positive")
    private Double cout;

    @Min(value = 0L, message = "The value must be positive")
    private Double prix;


    @ManyToMany(cascade = CascadeType.PERSIST)
    @JoinTable(
            name = "menu_meal",
            joinColumns = @JoinColumn(name = "menu_id"),
            inverseJoinColumns = @JoinColumn(name = "meal_id")

    )
    @JsonManagedReference
    List<MealEntity> meals;

    @ManyToMany(mappedBy = "menus",cascade = CascadeType.REMOVE)
    @JsonBackReference
    Set<ScheduleEntity> schedules ;

    @OneToMany(mappedBy = "menu" , cascade = CascadeType.ALL , orphanRemoval = true)
    @JsonBackReference
    private List<TicketEntity> tickets;

    @CreatedDate
    private Date createdAt;

    @LastModifiedDate
    private Date updatedAt;


}
