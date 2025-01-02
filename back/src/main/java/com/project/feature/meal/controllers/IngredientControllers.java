package com.project.feature.meal.controllers;

import com.project.all.dtos.ApiSuccessResponse;
import com.project.all.dtos.PaginatedResponse;
import com.project.feature.meal.services.IngredientService;
import com.project.feature.meal.services.MealService;
import com.project.feature.meal.dto.IngredientRequestDTO;
import com.project.feature.meal.dto.IngredientResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ingredient")

public class IngredientControllers {
    private final IngredientService ingredientService;

    @Autowired
    public IngredientControllers(IngredientService ingredientService) {
        this.ingredientService = ingredientService;
    }

    @PostMapping( "/add")
    public ResponseEntity<ApiSuccessResponse<IngredientResponseDTO>> addIngredient(@RequestBody IngredientRequestDTO ingredientRequestDTO) {
        IngredientResponseDTO ingredientResponseDTO = ingredientService.addIngredient(ingredientRequestDTO);
        ApiSuccessResponse<IngredientResponseDTO> apiSuccessResponse = new ApiSuccessResponse<>("success",ingredientResponseDTO);
        return new ResponseEntity<>(apiSuccessResponse, HttpStatus.CREATED);
    }
    @PutMapping( "/{id}")
    public ResponseEntity<ApiSuccessResponse<IngredientResponseDTO>> updateIngredient(@PathVariable int id,@RequestBody IngredientRequestDTO ingredientRequestDTO) {
        IngredientResponseDTO ingredientResponseDTO = ingredientService.updateIngredient(id,ingredientRequestDTO);
        ApiSuccessResponse<IngredientResponseDTO> apiSuccessResponse = new ApiSuccessResponse<>("success",ingredientResponseDTO);
        return new ResponseEntity<>(apiSuccessResponse, HttpStatus.OK);
    }
    @DeleteMapping( "/{id}")
    public ResponseEntity<ApiSuccessResponse<String>> deleteIngredient(@PathVariable int id) {
        boolean deleted  = ingredientService.deleteIngredient(id);
        ApiSuccessResponse<String> response;
        if (deleted) {
            response = new ApiSuccessResponse<>("success", "ingredient deleted successfully");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            throw new IllegalArgumentException("ingredient not found");
        }
    }

    @GetMapping( "/{id}")
    public ResponseEntity<ApiSuccessResponse<IngredientResponseDTO>> getIngredient(@PathVariable int id) {
        IngredientResponseDTO ingredientResponseDTO = ingredientService.getIngredient(id);
        ApiSuccessResponse<IngredientResponseDTO> apiSuccessResponse = new ApiSuccessResponse<>("success",ingredientResponseDTO);
        return new ResponseEntity<>(apiSuccessResponse, HttpStatus.OK);
    }

    @GetMapping( "/all")
    public ResponseEntity<ApiSuccessResponse<PaginatedResponse<IngredientResponseDTO>>> getAllIngredient(
            @RequestParam(required = false ,defaultValue = "name") String attribute,
            @RequestParam(required = false ,defaultValue = "") String  value,
            @RequestParam(required = false,defaultValue = "0") int page,
            @RequestParam(required = false,defaultValue = "10") int size
    ) {
        PaginatedResponse<IngredientResponseDTO> ingredientResponseDTO = ingredientService.getAllIngredient(attribute,value,page,size);
        ApiSuccessResponse<PaginatedResponse<IngredientResponseDTO>> apiSuccessResponse = new ApiSuccessResponse<>("success",ingredientResponseDTO);
        return new ResponseEntity<>(apiSuccessResponse, HttpStatus.OK);
    }




}
