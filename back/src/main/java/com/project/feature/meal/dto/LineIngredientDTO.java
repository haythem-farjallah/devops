package com.project.feature.meal.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.project.feature.meal.entities.IngredientEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LineIngredientDTO {

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Long id;
    private Double coutIngredient;
    private Double qte;

   @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private IngredientResponseDTO ingredient;

}
