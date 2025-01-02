package com.project.feature.meal.dto;

import com.project.feature.meal.utils.Unit;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class IngredientRequestDTO {
    @NotBlank(message = "Title is mandatory")
    private String name;

    @Min(value = 0L, message = "The value must be positive")
    private Double prix;

    @Min(value = 0L, message = "The value must be positive")
    private Double stock;

    @Enumerated(EnumType.STRING)
    private Unit unitPrice;




}
