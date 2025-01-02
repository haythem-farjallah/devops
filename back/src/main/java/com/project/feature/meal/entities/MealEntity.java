package com.project.feature.meal.entities;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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
import java.util.HashSet;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@EntityListeners(AuditingEntityListener.class)
@Entity
public class MealEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true, nullable = false)
    private String name;

    private String description;

    @Min(value = 0L, message = "The value must be positive")
    private Double prix;

    @Min(value = 0L, message = "The value must be positive")
    private Double cout;

    @Min(value = 0L, message = "The value must be positive")
    private Double raying;

    @OneToMany(fetch = FetchType.LAZY , cascade = CascadeType.ALL )
    @JsonManagedReference
    Set<LineIngredientEntity> lineIngredient;

    @ManyToMany(mappedBy = "meals",cascade = CascadeType.REMOVE)
    @JsonBackReference
    Set<MenuEntity> menus ;

    @CreatedDate
    private Date createdAt;

    @LastModifiedDate
    private Date updatedAt;
}
