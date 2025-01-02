package com.project.feature.meal.mappers;

import com.project.feature.meal.dto.IngredientRequestDTO;
import com.project.feature.meal.dto.LineIngredientDTO;
import com.project.feature.meal.dto.MealRequestDTO;
import com.project.feature.meal.dto.MealResponseDTO;
import com.project.feature.meal.entities.IngredientEntity;
import com.project.feature.meal.entities.LineIngredientEntity;
import com.project.feature.meal.entities.MealEntity;
import org.mapstruct.*;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface MealMapper {



    MealMapper INSTANCE = Mappers.getMapper(MealMapper.class);

    /**
     * Converts MealRequestDTO to MealEntity.
     */
    @Mapping(target = "id", ignore = true) // ID is auto-generated
    @Mapping(target = "createdAt", ignore = true) // Handled in service
    @Mapping(target = "updatedAt", ignore = true) // Handled in service
    MealEntity toMealEntity(MealRequestDTO dto);


    /**
     * Converts MealEntity to MealRequestDTO .
     */
    @Mapping(target = "lineIngredient", source = "lineIngredient")
    @Mapping(target = "createdAt", source ="createdAt" )
    @Mapping(target = "updatedAt", source = "updatedAt")
    MealResponseDTO toMealDto(MealEntity entity);

    /**
     * Updates an existing MealEntity entity from MealRequestDTO.
     */
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "lineIngredient", ignore = true)
    void updateEntity(MealRequestDTO dto, @MappingTarget MealEntity meal);


    /**
     * Converts LineIngredientEntity to LineIngredientDTO.
     */
    LineIngredientDTO toLineIngDto(LineIngredientEntity entity);


   @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
//    @Mapping(target = "id", ignore = true)
//    @Mapping(target = "ingredient" ,ignore = true)
   void updateLineIngredientFromDTO(LineIngredientDTO dto, @MappingTarget LineIngredientEntity lineIngredient);


}
