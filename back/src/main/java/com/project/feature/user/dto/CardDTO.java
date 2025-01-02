package com.project.feature.user.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.Date;

@Data
public class CardDTO {

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Long id;

    private double balance;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private double amount;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private  boolean active;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Date activationDate;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private  Date expiryDate;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Date createdAt;
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)

    private Date updatedAt;
}
