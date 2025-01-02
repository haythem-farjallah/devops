package com.project.feature.meal.dto;

import com.project.feature.meal.utils.Unit;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Data;

import java.time.LocalDateTime;


@Data
public class IngredientResponseDTO {

    private String id;

    private String name;

    private Double prix;

    private Double stock;

    @Enumerated(EnumType.STRING)
    private Unit unitPrice;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}
