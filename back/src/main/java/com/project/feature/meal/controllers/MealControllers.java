package com.project.feature.meal.controllers;


import com.project.all.dtos.ApiSuccessResponse;
import com.project.all.dtos.PaginatedResponse;
import com.project.feature.meal.dto.IngrediantLine;
import com.project.feature.meal.dto.LineIngredientDTO;
import com.project.feature.meal.dto.MealResponseDTO;
import com.project.feature.meal.services.MealService;
import com.project.feature.meal.dto.MealRequestDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/meal")
public class MealControllers {
    private final MealService mealService;
    @Autowired
    public MealControllers(MealService mealService) {
        this.mealService = mealService;
    }

    @PostMapping("/add")
    public ResponseEntity<ApiSuccessResponse<MealResponseDTO>> addMeal(@RequestBody MealRequestDTO mealRequestDTO) {
        MealResponseDTO meal =  mealService.addMeal(mealRequestDTO);
        ApiSuccessResponse<MealResponseDTO> apiSuccessResponse = new ApiSuccessResponse<>("success",meal);
        return new ResponseEntity<>(apiSuccessResponse, HttpStatus.OK);
    }

    @PutMapping("{id}")
    public ResponseEntity<ApiSuccessResponse<MealResponseDTO>> updateMeal(@PathVariable long id, @RequestBody MealRequestDTO mealRequestDTO) {
        MealResponseDTO meal = mealService.updateMeal(id, mealRequestDTO);
        ApiSuccessResponse<MealResponseDTO> apiSuccessResponse = new ApiSuccessResponse<>("success",meal);
        return new ResponseEntity<>(apiSuccessResponse, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiSuccessResponse<MealResponseDTO>> getMeal(@PathVariable int id) {
        MealResponseDTO meal = mealService.getMeal(id);
        ApiSuccessResponse<MealResponseDTO> apiSuccessResponse = new ApiSuccessResponse<>("success",meal);
        System.out.println(meal);
        return new ResponseEntity<>(apiSuccessResponse, HttpStatus.OK);
    }

    @GetMapping("/all")

    public ResponseEntity<ApiSuccessResponse<PaginatedResponse<MealResponseDTO>>> getAllMeal(
            @RequestParam(required = false ,defaultValue = "name") String attribute,
            @RequestParam(required = false ,defaultValue = "") String  value,
            @RequestParam(required = false,defaultValue = "0") int page,
            @RequestParam(required = false,defaultValue = "10") int size
    ) {
        PaginatedResponse<MealResponseDTO> listMeal = mealService.getAllMeal(attribute,value,page,size);
        ApiSuccessResponse<PaginatedResponse<MealResponseDTO>> apiSuccessResponse = new ApiSuccessResponse<>("success",listMeal);
        return new ResponseEntity<>(apiSuccessResponse, HttpStatus.OK);
    }

    @DeleteMapping( "/{id}")
    public ResponseEntity<ApiSuccessResponse<Boolean>> deleteMeal(@PathVariable int id) {
        boolean isDeleted  = mealService.deleteMeal(id);
        ApiSuccessResponse<Boolean> response;
        if (isDeleted) {
            response = new ApiSuccessResponse<>("success", true);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            throw new IllegalArgumentException("meal not found");
        }
    }


    //******************************//
    //**********lineIngredient******//
    //******************************//

    @PostMapping("/{idMeal}/line")
    public ResponseEntity<ApiSuccessResponse<Double>> addLineIngredientToMeal(@PathVariable long idMeal, @RequestBody IngrediantLine lineIngredientDTO) {
        Double coutTotal = mealService.addLineIngredient(idMeal, lineIngredientDTO);
        ApiSuccessResponse<Double> apiSuccessResponse = new ApiSuccessResponse<>("success",coutTotal);
        return new ResponseEntity<>(apiSuccessResponse, HttpStatus.OK);
    }
    @PutMapping("/{idMeal}/line/{idIng}")
    public ResponseEntity<ApiSuccessResponse<Double>> updateLineIngredientById(@PathVariable long idMeal,@PathVariable long idIng, @RequestBody LineIngredientDTO lineIngredientDTO) {
        Double coutTotal = mealService.updateLineIngredient(idIng,idMeal, lineIngredientDTO);
        ApiSuccessResponse<Double> apiSuccessResponse = new ApiSuccessResponse<>("success",coutTotal);
        return new ResponseEntity<>(apiSuccessResponse, HttpStatus.OK);
    }


    @DeleteMapping("/{idMeal}/line/{idIng}")
    public ResponseEntity<ApiSuccessResponse<Double>> deleteLineIngredientById(@PathVariable long idMeal,@PathVariable long idIng) {
        Double coutTotal = mealService.deleteLineIngredient(idIng,idMeal);
        ApiSuccessResponse<Double> apiSuccessResponse = new ApiSuccessResponse<>("success",coutTotal);
        return new ResponseEntity<>(apiSuccessResponse, HttpStatus.OK);
    }



}
