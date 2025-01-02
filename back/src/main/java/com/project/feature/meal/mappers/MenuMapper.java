package com.project.feature.meal.mappers;


import com.project.feature.meal.dto.MenuDTO;
import com.project.feature.meal.entities.MealEntity;
import com.project.feature.meal.entities.MenuEntity;
import com.project.feature.meal.repositories.MealRepositorie;
import org.mapstruct.*;

import java.awt.*;
import java.util.List;

@Mapper(componentModel = "spring")
public interface MenuMapper {


    MenuEntity toEntity(MenuDTO dto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntity(MenuDTO dto, @MappingTarget MenuEntity menuEntity);

    MenuDTO toDto(MenuEntity menu);




    @AfterMapping
    default void mapMeals(MenuDTO dto, @MappingTarget MenuEntity menuEntity, @Context MealRepositorie mealRepository) {
        if (dto.getMealsId() != null && !dto.getMealsId().isEmpty()) {
            List<MealEntity> meals = mealRepository.findAllById(dto.getMealsId());
            double titalPrix = meals.stream().mapToDouble(MealEntity::getPrix).sum();
            double titalCout = meals.stream().mapToDouble(MealEntity::getCout).sum();
            menuEntity.setMeals(meals);
            menuEntity.setPrix(titalPrix);
            menuEntity.setCout(titalCout);
        }
    }

}

