package com.project.feature.meal.repositories;

import com.project.feature.meal.entities.LineIngredientEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public  interface LineIngredientRepositorie extends JpaRepository<LineIngredientEntity,Long> {
}