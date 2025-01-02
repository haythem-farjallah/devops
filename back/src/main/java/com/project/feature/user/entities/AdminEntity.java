package com.project.feature.user.entities;


import com.project.feature.user.utils.Role;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.Date;

@Entity
@DiscriminatorValue("ROLE_ADMIN")
@Data
@SuperBuilder
@NoArgsConstructor
public class AdminEntity extends UserEnity {


}
