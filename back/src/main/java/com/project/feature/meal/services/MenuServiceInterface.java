package com.project.feature.meal.services;

import com.project.all.dtos.PaginatedResponse;
import com.project.feature.meal.dto.MenuDTO;

import java.util.List;

public interface MenuServiceInterface {

    public MenuDTO addMenu(MenuDTO menuDTO);

    public MenuDTO updateMenu(long id, MenuDTO menuDTO);

    public boolean deleteMenu(long menuId);

    public MenuDTO getMenu(long id);

    public PaginatedResponse<MenuDTO> getAllMenu(String attribute, String  value, int page, int size);
}
