package com.project.feature.meal.mappers;


import com.project.feature.meal.dto.ScheduleDTO;
import com.project.feature.meal.entities.MenuEntity;
import com.project.feature.meal.entities.ScheduleEntity;
import com.project.feature.meal.repositories.MenuRepositorie;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ScheduleMapper {

    ScheduleEntity toEntity(ScheduleDTO dto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntity(ScheduleDTO dto, @MappingTarget ScheduleEntity target);

    ScheduleDTO toDto(ScheduleEntity entity);

    @AfterMapping
    default void mapMenus(ScheduleDTO dto, @MappingTarget ScheduleEntity scheduleEntity , @Context MenuRepositorie menuRepositorie) {
        if (dto.getMenusId() != null&&!dto.getMenusId().isEmpty()) {
            List<MenuEntity> menus = menuRepositorie.findAllById(dto.getMenusId());
            scheduleEntity.setMenus(menus);
        }
    }
}
