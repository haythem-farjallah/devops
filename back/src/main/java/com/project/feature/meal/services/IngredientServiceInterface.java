package com.project.feature.meal.services;

import com.project.all.dtos.PaginatedResponse;
import com.project.feature.meal.dto.IngredientRequestDTO;
import com.project.feature.meal.dto.IngredientResponseDTO;

import java.util.List;

public interface IngredientServiceInterface {
    public IngredientResponseDTO addIngredient(IngredientRequestDTO ingredientRequestDTO) ;
    public IngredientResponseDTO updateIngredient(long id, IngredientRequestDTO ingredientRequestDTO) ;
    public Boolean deleteIngredient(long id);
    public IngredientResponseDTO getIngredient(long id);
    public PaginatedResponse<IngredientResponseDTO> getAllIngredient(String attribute, String  value, int page, int size) ;
}
