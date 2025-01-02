package com.project.feature.meal.services;

import com.project.all.dtos.PaginatedResponse;
import com.project.feature.meal.dto.ScheduleDTO;

import java.util.List;

public interface ScheduleServiceInterface {


    public ScheduleDTO addSchedule(ScheduleDTO scheduleDTO);

    public ScheduleDTO updateSchedule(long id,ScheduleDTO scheduleDTO);

    public boolean deleteSchedule(long id);

    public ScheduleDTO getScheduleById(long id);

    public PaginatedResponse<ScheduleDTO> getAllSchedules(String attribute, String  value, int page, int size);

    public ScheduleDTO getActiveSchedule();

    public ScheduleDTO activeScheduleById(long id);

}
