package com.project.feature.meal.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@EntityListeners(AuditingEntityListener.class)
@Entity
@Table(name = "Schedule")
public class ScheduleEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;


    private Boolean active = false ;


    @ManyToMany(cascade = CascadeType.PERSIST)
    @JoinTable(

            name = "menu_schedule",
            joinColumns = @JoinColumn(name = "schedule_id1"),
            inverseJoinColumns = @JoinColumn(name = "menu_id1")
    )
    @JsonManagedReference
    List<MenuEntity> menus;

    private Date date;


    @CreatedDate
    private Date createdAt;

    @LastModifiedDate
    private Date updatedAt;

}
