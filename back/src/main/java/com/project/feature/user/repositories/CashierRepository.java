package com.project.feature.user.repositories;

import com.project.feature.user.entities.CashierEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface CashierRepository extends JpaRepository<CashierEntity,Long> , JpaSpecificationExecutor<CashierEntity> {
}
