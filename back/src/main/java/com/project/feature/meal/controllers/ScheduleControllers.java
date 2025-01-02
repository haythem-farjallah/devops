package com.project.feature.meal.controllers;

import com.project.all.dtos.ApiSuccessResponse;
import com.project.all.dtos.PaginatedResponse;
import com.project.feature.meal.dto.MenuDTO;
import com.project.feature.meal.dto.ScheduleDTO;
import com.project.feature.meal.services.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/schedule")
public class ScheduleControllers {
    private final ScheduleService scheduleService;


    @Autowired
    public ScheduleControllers(ScheduleService scheduleService) {
        this.scheduleService = scheduleService;
    }

    @PostMapping("/add")
    public ResponseEntity<ApiSuccessResponse<ScheduleDTO>> addSchedule(@RequestBody ScheduleDTO scheduleDTO){
        ScheduleDTO savedScheduleDTO = scheduleService.addSchedule(scheduleDTO);
        ApiSuccessResponse<ScheduleDTO> apiSuccessResponse = new ApiSuccessResponse<>("success", savedScheduleDTO);
        return new ResponseEntity<>(apiSuccessResponse, HttpStatus.CREATED);
    }

    @PutMapping("{id}")
    public ResponseEntity<ApiSuccessResponse<ScheduleDTO>> updateSchedule(@PathVariable("id") Long id,@RequestBody ScheduleDTO scheduleDTO){
        ScheduleDTO updatedScheduleDTO = scheduleService.updateSchedule(id,scheduleDTO);
        ApiSuccessResponse<ScheduleDTO> apiSuccessResponse = new ApiSuccessResponse<>("success", updatedScheduleDTO);
        return new ResponseEntity<>(apiSuccessResponse, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<ApiSuccessResponse<ScheduleDTO>> getSchedule(@PathVariable("id") Long id){
        ScheduleDTO schedule = scheduleService.getScheduleById(id);
        ApiSuccessResponse<ScheduleDTO> apiSuccessResponse = new ApiSuccessResponse<>("success", schedule);
        return new ResponseEntity<>(apiSuccessResponse, HttpStatus.CREATED);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<ApiSuccessResponse<Boolean>> deleteSchedule(@PathVariable("id") Long id){
        boolean isDeleted  = scheduleService.deleteSchedule(id);
        if (isDeleted) {
            ApiSuccessResponse<Boolean> apiSuccessResponse = new ApiSuccessResponse<>("success", true);
            return new ResponseEntity<>(apiSuccessResponse, HttpStatus.NO_CONTENT);
        } else {
            ApiSuccessResponse<Boolean> apiSuccessResponse = new ApiSuccessResponse<>("error", false);
            return new ResponseEntity<>(apiSuccessResponse, HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/all")
    public ResponseEntity<ApiSuccessResponse< PaginatedResponse<ScheduleDTO>>> getAllSchedules(     @RequestParam(required = false ,defaultValue = "name") String attribute,
                                                                                       @RequestParam(required = false ,defaultValue = "") String  value,
                                                                                       @RequestParam(required = false,defaultValue = "0") int page,
                                                                                       @RequestParam(required = false,defaultValue = "10") int size){
        PaginatedResponse<ScheduleDTO> schedules = scheduleService.getAllSchedules(attribute,value,page,size);
        ApiSuccessResponse< PaginatedResponse<ScheduleDTO>> apiSuccessResponse = new ApiSuccessResponse<>("success", schedules);
        return new ResponseEntity<>(apiSuccessResponse, HttpStatus.CREATED);
    }

    @PutMapping("/active/{id}")
    public ResponseEntity<ApiSuccessResponse<ScheduleDTO>> activeScheduleById(@PathVariable("id") Long id){
        ScheduleDTO activeSchedule = scheduleService.activeScheduleById(id);
        ApiSuccessResponse<ScheduleDTO> apiSuccessResponse = new ApiSuccessResponse<>("success", activeSchedule);
        return new ResponseEntity<>(apiSuccessResponse, HttpStatus.CREATED);
    }
    @GetMapping("/fourMondays")
    public ResponseEntity<ApiSuccessResponse<List<Date> >> getAvailableNextFourMondays(){
       List<Date>  listDates = scheduleService.getAvailableNextFourMondays();
        ApiSuccessResponse<List<Date> > apiSuccessResponse = new ApiSuccessResponse<>("success", listDates);
        return new ResponseEntity<>(apiSuccessResponse, HttpStatus.CREATED);
    }
    @GetMapping("/active")
    public ResponseEntity<ApiSuccessResponse<ScheduleDTO>> getActiveSchedule(){
        ScheduleDTO schedule = scheduleService.getActiveSchedule();
        ApiSuccessResponse<ScheduleDTO> apiSuccessResponse = new ApiSuccessResponse<>("success", schedule);
        return new ResponseEntity<>(apiSuccessResponse, HttpStatus.CREATED);
    }
}
