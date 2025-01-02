package com.project.feature.meal.repositories;


import com.project.feature.meal.entities.IngredientEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface IngredientRepositorie extends JpaRepository<IngredientEntity, Long> , JpaSpecificationExecutor<IngredientEntity> {
}
