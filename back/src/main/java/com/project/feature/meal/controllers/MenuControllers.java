package com.project.feature.meal.controllers;


import com.project.all.dtos.ApiSuccessResponse;
import com.project.all.dtos.PaginatedResponse;
import com.project.feature.meal.dto.MealResponseDTO;
import com.project.feature.meal.dto.MenuDTO;
import com.project.feature.meal.services.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/menu")
public class MenuControllers {
    private final MenuService menuService;

    @Autowired
    public MenuControllers(MenuService menuService) {
        this.menuService = menuService;
    }

    @PostMapping("/add")
    public ResponseEntity<ApiSuccessResponse<MenuDTO>>addMenu(@RequestBody MenuDTO menuDTO) {
        MenuDTO newMenu = menuService.addMenu(menuDTO);
        ApiSuccessResponse<MenuDTO> apiSuccessResponse = new ApiSuccessResponse<>("success",newMenu);
        return new ResponseEntity<>(apiSuccessResponse, HttpStatus.CREATED);
    }

    @PutMapping("{id}")
    public ResponseEntity<ApiSuccessResponse<MenuDTO>>updateMenu(@PathVariable("id") Long id, @RequestBody MenuDTO menuDTO) {
        MenuDTO newMenu = menuService.updateMenu(id, menuDTO);
        ApiSuccessResponse<MenuDTO> apiSuccessResponse = new ApiSuccessResponse<>("success",newMenu);
        return new ResponseEntity<>(apiSuccessResponse, HttpStatus.OK);
    }
    @GetMapping("{id}")
    public ResponseEntity<ApiSuccessResponse<MenuDTO>>getMenu(@PathVariable("id") Long id) {
        MenuDTO menu = menuService.getMenu(id);
        ApiSuccessResponse<MenuDTO> apiSuccessResponse = new ApiSuccessResponse<>("success",menu);
        return new ResponseEntity<>(apiSuccessResponse, HttpStatus.OK);
    }
    @GetMapping("/all")
    public ResponseEntity<ApiSuccessResponse<PaginatedResponse<MenuDTO>>> getAllMenu(
            @RequestParam(required = false ,defaultValue = "name") String attribute,
            @RequestParam(required = false ,defaultValue = "") String  value,
            @RequestParam(required = false,defaultValue = "0") int page,
            @RequestParam(required = false,defaultValue = "10") int size
    ) {
        PaginatedResponse<MenuDTO> allMenus = menuService.getAllMenu(attribute,value,page,size);
        ApiSuccessResponse<PaginatedResponse<MenuDTO>> apiSuccessResponse = new ApiSuccessResponse<>("success", allMenus);
        return new ResponseEntity<>(apiSuccessResponse, HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<ApiSuccessResponse<Boolean>> deleteMenu(@PathVariable("id") Long id) {
        boolean isDeleted = menuService.deleteMenu(id);
        if (isDeleted) {
            ApiSuccessResponse<Boolean> apiSuccessResponse = new ApiSuccessResponse<>("success", true);
            return new ResponseEntity<>(apiSuccessResponse, HttpStatus.NO_CONTENT);
        } else {
            ApiSuccessResponse<Boolean> apiSuccessResponse = new ApiSuccessResponse<>("error", false);
            return new ResponseEntity<>(apiSuccessResponse, HttpStatus.NOT_FOUND);
        }
    }

}
