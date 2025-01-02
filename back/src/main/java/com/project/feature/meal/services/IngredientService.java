package com.project.feature.meal.services;

import com.project.all.dtos.PaginatedResponse;
import com.project.all.utils.EntitySpecification;
import com.project.feature.meal.dto.IngredientRequestDTO;
import com.project.feature.meal.dto.IngredientResponseDTO;
import com.project.feature.meal.entities.IngredientEntity;
import com.project.feature.meal.mappers.IngredientMapper;
import com.project.feature.meal.repositories.IngredientRepositorie;
import com.project.feature.payment.dto.TicketDTO;
import com.project.feature.payment.entities.TicketEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
public class IngredientService implements IngredientServiceInterface{
    private final IngredientRepositorie ingredientRepositorie;
    private final IngredientMapper ingredientMapper;

    public IngredientService(IngredientRepositorie ingredientRepositorie, IngredientMapper ingredientMapper) {
        this.ingredientRepositorie = ingredientRepositorie;
        this.ingredientMapper = ingredientMapper;
    }
    public IngredientResponseDTO addIngredient(IngredientRequestDTO ingredientRequestDTO) {
        IngredientEntity ingredient = ingredientMapper.toIngredientEntity(ingredientRequestDTO);
        IngredientEntity savedIngredient = ingredientRepositorie.save(ingredient);
        return ingredientMapper.toIngredientDTO(savedIngredient);
    }

    public IngredientResponseDTO updateIngredient(long id, IngredientRequestDTO ingredientRequestDTO) {
        IngredientEntity ingredient = ingredientRepositorie.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Ingredient not found"));
        ingredientMapper.updateIngredientFromDTO(ingredientRequestDTO, ingredient);
        IngredientEntity updatedIngredient = ingredientRepositorie.save(ingredient);
        return ingredientMapper.toIngredientDTO(updatedIngredient);
    }

    public Boolean deleteIngredient(long id) {
        if (!ingredientRepositorie.existsById(id)) {
            throw new IllegalArgumentException("Ingredient not found");
        }
        ingredientRepositorie.deleteById(id);
        return true;
    }


    public IngredientResponseDTO getIngredient(long id) {
        IngredientEntity ingredient = ingredientRepositorie.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Ingredient not found"));
        return ingredientMapper.toIngredientDTO(ingredient);
    }

    @Override
    public PaginatedResponse<IngredientResponseDTO> getAllIngredient(String attribute, String  value, int page, int size) {
        Specification<IngredientEntity> spec = EntitySpecification.hasAttribute(attribute,value);
        Pageable pageable = PageRequest.of(page, size);
        Page<IngredientEntity> ingredientPage = ingredientRepositorie.findAll(spec, pageable);

// Mappe chaque élément de la page vers le DTO correspondant
        List<IngredientResponseDTO> ingDTOList = ingredientPage
                .getContent()
                .stream()
                .map(ingredientMapper::toIngredientDTO)
                .collect(Collectors.toList());

// Crée une nouvelle page contenant les DTO avec les mêmes métadonnées
        Page<IngredientResponseDTO> ingPage = new PageImpl<>(ingDTOList, pageable, ingredientPage.getTotalElements());
        return new PaginatedResponse<IngredientResponseDTO>(ingPage);

    }

}
