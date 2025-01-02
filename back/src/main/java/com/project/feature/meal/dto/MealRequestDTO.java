package com.project.feature.meal.dto;


import lombok.Data;

import java.util.Set;

@Data
public class MealRequestDTO {
    private String name;
    private String description;
    private Double prix;
    private  Double cout;
    Set<IngrediantLine> ingredients;
}
