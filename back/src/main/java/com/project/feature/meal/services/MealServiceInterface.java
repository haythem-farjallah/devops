package com.project.feature.meal.services;

import com.project.all.dtos.PaginatedResponse;
import com.project.feature.meal.dto.*;
import com.project.feature.meal.entities.LineIngredientEntity;
import com.project.feature.meal.entities.MealEntity;

import java.util.List;
import java.util.Set;

public interface MealServiceInterface {
    public MealResponseDTO addMeal(MealRequestDTO mealRequestDTO);
    public MealResponseDTO updateMeal(long id,MealRequestDTO mealRequestDTO);
    public MealResponseDTO getMeal(long id);
    public PaginatedResponse<MealResponseDTO> getAllMeal(String attribute, String  value, int page, int size);
    public Boolean deleteMeal(long id);

    public Set<LineIngredientEntity> createLineIngredient(MealEntity meal, Set<IngrediantLine> listIngredient);
    public Double addLineIngredient(long id,IngrediantLine ingrediantLine);
    public Double updateLineIngredient(long id ,long idMeal,LineIngredientDTO lineIngredientDTO);
    public Double deleteLineIngredient(long id,long idMeal);
}
