package com.project.feature.payment.dto;


import com.fasterxml.jackson.annotation.JsonProperty;
import com.project.feature.meal.dto.MenuDTO;
import com.project.feature.meal.entities.MenuEntity;
import com.project.feature.payment.enums.PaymentMethod;
import com.project.feature.user.dto.CardDTO;
import com.project.feature.user.dto.UserDTO;
import com.project.feature.user.entities.CardEntity;
import com.project.feature.user.entities.StudentEntity;
import lombok.Data;

import java.util.Date;

@Data
public class TicketDTO {

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Long id;

    private double amount;

    private Date date;

    private PaymentMethod paymentMethod;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private long studentId;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private long cardId;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private long menuId;



    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private UserDTO student;
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private CardDTO card;
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private MenuDTO menu;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Date createdAt;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Date updatedAt;



}
