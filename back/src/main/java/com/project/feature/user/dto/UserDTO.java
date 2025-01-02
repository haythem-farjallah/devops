package com.project.feature.user.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.project.feature.user.utils.Role;
import com.project.feature.user.utils.University;
import lombok.Data;

import java.util.Date;

@Data
public class UserDTO {
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Long id;

    private String username;


    private String codeP;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    private String email;

    private String phone;

    private String address;


    private Role role;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Date createdAt;
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Date updatedAt;

    private University university;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private CardDTO cart;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private boolean active;

}
