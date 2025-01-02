package com.project.feature.meal.dto;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.Date;
import java.util.List;
import java.util.Set;

@Data
public class MenuDTO {
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Long id;
    private String name;
    private Double cout;
    private Double prix;


    List<MealResponseDTO> meals;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    List<Long> mealsId;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Date createdAt;
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Date updatedAt;
}
