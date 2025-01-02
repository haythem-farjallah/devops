package com.project.feature.meal.dto;

import com.project.feature.meal.entities.LineIngredientEntity;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.Set;
@Data
public class MealResponseDTO {
    private  long id;
    private String name;
    private String description;
    private Double prix;
    private Double cout;
    Set<LineIngredientDTO> lineIngredient ;
    private Date createdAt;

    private Date updatedAt;
}
