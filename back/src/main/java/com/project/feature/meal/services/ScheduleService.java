package com.project.feature.meal.services;

import com.project.all.dtos.PaginatedResponse;
import com.project.all.utils.EntitySpecification;
import com.project.feature.meal.dto.MealResponseDTO;
import com.project.feature.meal.dto.ScheduleDTO;
import com.project.feature.meal.entities.MealEntity;
import com.project.feature.meal.entities.ScheduleEntity;
import com.project.feature.meal.mappers.ScheduleMapper;
import com.project.feature.meal.repositories.MenuRepositorie;
import com.project.feature.meal.repositories.ScheduleRepositorie;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class ScheduleService implements ScheduleServiceInterface {

    private final ScheduleRepositorie scheduleRepositorie;
    private final MenuRepositorie menuRepositorie;
    private final ScheduleMapper scheduleMapper;

    public ScheduleService(ScheduleRepositorie scheduleRepositorie, MenuRepositorie menuRepositorie, ScheduleMapper scheduleMapper) {
        this.scheduleRepositorie = scheduleRepositorie;
        this.menuRepositorie = menuRepositorie;
        this.scheduleMapper = scheduleMapper;
    }



    @Override
    public ScheduleDTO addSchedule(ScheduleDTO scheduleDTO) {

        if (scheduleRepositorie.findByDate(scheduleDTO.getDate()).isPresent()) {
            throw new IllegalArgumentException("Schedule already exists for this date: " + scheduleDTO.getDate());
        }

        ScheduleEntity scheduleEntity = scheduleMapper.toEntity(scheduleDTO);

        scheduleMapper.mapMenus(scheduleDTO,scheduleEntity,menuRepositorie);

        ScheduleEntity savedScheduleEntity = scheduleRepositorie.save(scheduleEntity);

        return scheduleMapper.toDto(savedScheduleEntity);
    }

    @Override
    public ScheduleDTO updateSchedule(long id, ScheduleDTO scheduleDTO) {
        ScheduleEntity scheduleEntity = scheduleRepositorie.findById(id)
                .orElseThrow(()-> new IllegalArgumentException("Schedule not found"));
        
        scheduleMapper.updateEntity(scheduleDTO , scheduleEntity);

        scheduleMapper.mapMenus(scheduleDTO,scheduleEntity,menuRepositorie);

        ScheduleEntity updatedScheduleEntity = scheduleRepositorie.save(scheduleEntity);

        return scheduleMapper.toDto(updatedScheduleEntity);
    }

    @Override
    public boolean deleteSchedule(long id) {
        ScheduleEntity scheduleEntity = scheduleRepositorie.findById(id)
                .orElseThrow(()-> new IllegalArgumentException("Schedule not found"));
        scheduleRepositorie.delete(scheduleEntity);
        return true;
    }

    @Override
    public ScheduleDTO getScheduleById(long id) {
        ScheduleEntity scheduleEntity = scheduleRepositorie.findById(id)
                .orElseThrow(()-> new IllegalArgumentException("Schedule not found"));
        return scheduleMapper.toDto(scheduleEntity);
    }

    @Override
    public PaginatedResponse<ScheduleDTO> getAllSchedules(String attribute, String  value, int page, int size) {
        Specification<ScheduleEntity> spec = EntitySpecification.hasAttribute(attribute,value);
        Pageable pageable = PageRequest.of(page, size);
        Page<ScheduleEntity> EntityPage = scheduleRepositorie.findAll(spec, pageable);

        List<ScheduleDTO> ingDTOList = EntityPage
                .getContent()
                .stream()
                .map(scheduleMapper::toDto)
                .collect(Collectors.toList());

        Page<ScheduleDTO> ingPage = new PageImpl<>(ingDTOList, pageable, EntityPage.getTotalElements());
        return new PaginatedResponse<ScheduleDTO>(ingPage);
    }

    @Override

    public ScheduleDTO getActiveSchedule() {
        ScheduleEntity activeSchedule = scheduleRepositorie.findFirstByActiveTrue()
                .orElseThrow(()-> new IllegalArgumentException("Schedule not found"));;
        return scheduleMapper.toDto(activeSchedule);
    }

    @Override
    //@Transactional//bech ken sar err fi ay blasar yel8i kol chy
    public ScheduleDTO activeScheduleById(long id) {
        ScheduleEntity scheduleEntity = scheduleRepositorie.findById(id)
                .orElseThrow(()-> new IllegalArgumentException("Schedule not found"));

        scheduleEntity.setActive(true);

      Optional<ScheduleEntity> activeSchedule = scheduleRepositorie.findFirstByActiveTrue();
        activeSchedule.ifPresent(as -> {
            as.setActive(false);
            scheduleRepositorie.save(as);
        });

        ScheduleEntity newActiveScheduleEntity = scheduleRepositorie.save(scheduleEntity);

        return scheduleMapper.toDto(newActiveScheduleEntity);
    }


    public List<Date> getAvailableNextFourMondays() {
        List<Date> nextFourMondays = new ArrayList<>();

        // Date actuelle
        Calendar calendar = Calendar.getInstance(TimeZone.getTimeZone("UTC"));
        calendar.setTime(new Date());

        setToMidnight(calendar);
        // Trouver le prochain lundi
        int todayDayOfWeek = calendar.get(Calendar.DAY_OF_WEEK);
        int daysUntilNextMonday = (Calendar.MONDAY - todayDayOfWeek + 7) % 7;
        if (daysUntilNextMonday == 0) {
            daysUntilNextMonday = 7; // Passer au lundi suivant si aujourd'hui est déjà lundi
        }
        calendar.add(Calendar.DAY_OF_MONTH, daysUntilNextMonday);

        // Ajouter les 4 prochains lundis
        for (int i = 0; i < 4; i++) {
            nextFourMondays.add(calendar.getTime());
            calendar.add(Calendar.WEEK_OF_YEAR, 1); // Passer au lundi suivant
        }

        // Récupérer les dates déjà utilisées dans la table "menu"
        List<Date> existingDates = scheduleRepositorie.findExistingDates(nextFourMondays);

        // Filtrer les lundis disponibles
        nextFourMondays.removeAll(existingDates);

        return nextFourMondays;
    }

    private void setToMidnight(Calendar calendar) {
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);
    }

}
