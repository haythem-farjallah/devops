package com.project.feature.user.repositories;

import com.project.feature.user.entities.UserEnity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEnity, Long>, JpaSpecificationExecutor<UserEnity> {
    Optional<UserEnity> findByUsername(String username);
    Optional<UserEnity> findByEmail(String email);
    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);
}
