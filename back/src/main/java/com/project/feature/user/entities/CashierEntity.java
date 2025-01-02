package com.project.feature.user.entities;


import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Entity
@DiscriminatorValue("ROLE_CASHIER")
@Data
@SuperBuilder
@NoArgsConstructor
public class CashierEntity extends UserEnity {
}
