package com.project.feature.meal.repositories;

import com.project.feature.meal.entities.MenuEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;

public interface MenuRepositorie extends JpaRepository<MenuEntity, Long>, JpaSpecificationExecutor<MenuEntity> {
}
