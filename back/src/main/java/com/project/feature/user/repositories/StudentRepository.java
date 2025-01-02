package com.project.feature.user.repositories;

import com.project.feature.user.entities.StudentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;

public interface StudentRepository extends JpaRepository<StudentEntity, Long> , JpaSpecificationExecutor<StudentEntity> {

    Optional<StudentEntity> findByUsername(String username);
    Optional<StudentEntity> findByCodeP(String codeP);
    Optional<StudentEntity> findByEmail(String email);
    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);
}
