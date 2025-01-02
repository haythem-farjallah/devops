package com.project.feature.user.repositories;

import com.project.feature.user.entities.CardEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CardRepository extends JpaRepository<CardEntity,Long> {
}
