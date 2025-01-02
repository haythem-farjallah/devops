package com.project.feature.meal.entities;


import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import lombok.*;

@Data
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class LineIngredientEntity {



    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Min(value = 0L, message = "The value must be positive")
    private Double coutIngredient;

    @Min(value = 0L, message = "The value must be positive")
    private Double qte;

    @ManyToOne
    private IngredientEntity ingredient;


    public LineIngredientEntity(Double coutIngredient, Double qte, IngredientEntity ingredient) {
        this.coutIngredient = coutIngredient;
        this.qte = qte;
        this.ingredient = ingredient;

    }


}
