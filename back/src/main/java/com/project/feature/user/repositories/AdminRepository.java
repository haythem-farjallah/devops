package com.project.feature.user.repositories;

import com.project.feature.user.entities.AdminEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface AdminRepository extends JpaRepository<AdminEntity, Long> , JpaSpecificationExecutor<AdminEntity> {
}
