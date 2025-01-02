package com.project.feature.meal.services;

import com.project.all.dtos.PaginatedResponse;
import com.project.all.utils.EntitySpecification;
import com.project.feature.meal.dto.MealResponseDTO;
import com.project.feature.meal.dto.MenuDTO;
import com.project.feature.meal.entities.MealEntity;
import com.project.feature.meal.entities.MenuEntity;
import com.project.feature.meal.mappers.MenuMapper;
import com.project.feature.meal.repositories.MealRepositorie;
import com.project.feature.meal.repositories.MenuRepositorie;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;


@Service
public class MenuService implements MenuServiceInterface {

    private final MealRepositorie mealRepositorie;
    private final MenuRepositorie menuRepositorie;
    private final MenuMapper menuMapper;

    public MenuService(MealRepositorie mealRepositorie, MenuRepositorie menuRepositorie, MenuMapper menuMapper) {
        this.mealRepositorie = mealRepositorie;
        this.menuRepositorie = menuRepositorie;
        this.menuMapper = menuMapper;
    }

    @Override
    public MenuDTO addMenu(MenuDTO menuDTO) {
        MenuEntity menuEntity = menuMapper.toEntity(menuDTO);

        menuMapper.mapMeals(menuDTO,menuEntity,mealRepositorie);

        MenuEntity savedMenuEntity = menuRepositorie.save(menuEntity);

        return menuMapper.toDto(savedMenuEntity);
    }

    @Override
    public MenuDTO updateMenu(long id, MenuDTO menuDTO) {
       MenuEntity menuEntity = menuRepositorie.findById(id)
                .orElseThrow(()-> new IllegalArgumentException("menu not found"));

        menuMapper.updateEntity(menuDTO, menuEntity);

        menuMapper.mapMeals(menuDTO,menuEntity,mealRepositorie);

        MenuEntity updatedMenuEntity = menuRepositorie.save(menuEntity);
        return menuMapper.toDto(updatedMenuEntity);
    }

    @Override
    public boolean deleteMenu(long menuId) {
        MenuEntity menuEntity = menuRepositorie.findById(menuId)
                .orElseThrow(()-> new IllegalArgumentException("menu not found"));
        menuRepositorie.delete(menuEntity);
        return true;
    }

    @Override
    public MenuDTO getMenu(long id) {
        MenuEntity menuEntity = menuRepositorie.findById(id)
                .orElseThrow(() -> new RuntimeException("Menu with ID " + id + " not found."));
        return menuMapper.toDto(menuEntity);
    }

    @Override
    public PaginatedResponse<MenuDTO> getAllMenu(String attribute, String  value, int page, int size) {
        Specification<MenuEntity> spec = EntitySpecification.hasAttribute(attribute,value);
        Pageable pageable = PageRequest.of(page, size);
        Page<MenuEntity> menuEntityPage = menuRepositorie.findAll(spec, pageable);

        List<MenuDTO> ingDTOList = menuEntityPage
                .getContent()
                .stream()
                .map(menuMapper::toDto)
                .collect(Collectors.toList());

        Page<MenuDTO> ingPage = new PageImpl<>(ingDTOList, pageable, menuEntityPage.getTotalElements());
        return new PaginatedResponse<MenuDTO>(ingPage);

    }



}
