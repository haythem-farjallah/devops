package com.project.feature.meal.repositories;

import com.project.feature.meal.entities.MealEntity;
import com.project.feature.meal.mappers.IngredientMapper;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface MealRepositorie extends JpaRepository<MealEntity, Long>, JpaSpecificationExecutor<MealEntity> {
   

}
