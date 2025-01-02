package com.project.feature.meal.mappers;


import com.project.feature.meal.dto.IngredientRequestDTO;
import com.project.feature.meal.dto.IngredientResponseDTO;
import com.project.feature.meal.entities.IngredientEntity;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface IngredientMapper {

    /**
     * Converts IngredientRequestDTO to IngredientEntity.
     */



    @Mapping(target = "id", ignore = true) // ID is auto-generated
    @Mapping(target = "createdAt", ignore = true) // Handled in service
    @Mapping(target = "updatedAt", ignore = true) // Handled in service
    IngredientEntity toIngredientEntity(IngredientRequestDTO dto);

    /**
     * Converts IngredientEntity to IngredientRequestDTO.
     */
    @Mapping(target = "createdAt", dateFormat = "yyyy-MM-dd HH:mm")
    @Mapping(target = "updatedAt", dateFormat = "yyyy-MM-dd HH:mm")
    IngredientResponseDTO toIngredientDTO(IngredientEntity ingredient);

    /**
     * Updates an existing IngredientEntity entity from IngredientRequestDTO.
     */
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    void updateIngredientFromDTO(IngredientRequestDTO dto, @MappingTarget IngredientEntity ingredient);



}
