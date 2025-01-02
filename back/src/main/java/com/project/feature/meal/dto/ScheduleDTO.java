package com.project.feature.meal.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class ScheduleDTO {
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Long id;
    private String name;

    List<MenuDTO> menus;

    private boolean active;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    List<Long> menusId;

    private Date date;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Date createdAt;
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Date updatedAt;

}
