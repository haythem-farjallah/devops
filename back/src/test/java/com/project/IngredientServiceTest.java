package com.project;

import com.project.all.dtos.PaginatedResponse;
import com.project.feature.meal.dto.IngredientRequestDTO;
import com.project.feature.meal.dto.IngredientResponseDTO;
import com.project.feature.meal.entities.IngredientEntity;
import com.project.feature.meal.mappers.IngredientMapper;
import com.project.feature.meal.repositories.IngredientRepositorie;
import com.project.feature.meal.services.IngredientService;
import com.project.feature.meal.utils.Unit;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class IngredientServiceTest {

    @Mock
    private IngredientRepositorie ingredientRepositorie;

    @Mock
    private IngredientMapper ingredientMapper;

    @InjectMocks
    private IngredientService ingredientService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testAddIngredient() {
        // Arrange
        IngredientRequestDTO requestDTO = new IngredientRequestDTO("Sugar", 10.0, 100.0, Unit.KG);
        IngredientEntity entity = new IngredientEntity();
        IngredientEntity savedEntity = new IngredientEntity(1L, "Sugar", 10.0, 100.0, Unit.KG, null, null);
        IngredientResponseDTO responseDTO = new IngredientResponseDTO("1", "Sugar", 10.0, 100.0, Unit.KG, LocalDateTime.now(),LocalDateTime.now());

        when(ingredientMapper.toIngredientEntity(requestDTO)).thenReturn(entity);
        when(ingredientRepositorie.save(entity)).thenReturn(savedEntity);
        when(ingredientMapper.toIngredientDTO(savedEntity)).thenReturn(responseDTO);

        // Act
        IngredientResponseDTO result = ingredientService.addIngredient(requestDTO);

        // Assert
        assertNotNull(result);
        assertEquals(responseDTO, result);
        verify(ingredientRepositorie).save(entity);
    }

    @Test
    void testUpdateIngredient() {
        // Arrange
        long id = 1;
        IngredientRequestDTO requestDTO = new IngredientRequestDTO("Salt", 5.0, 50.0, Unit.G);
        IngredientEntity existingEntity = new IngredientEntity(id, "Sugar", 10.0, 100.0, null, null, null);
        IngredientEntity updatedEntity = new IngredientEntity(id, "Salt", 5.0, 50.0, null, null, null);
        IngredientResponseDTO responseDTO = new IngredientResponseDTO("1", "Salt", 5.0, 50.0, Unit.G, LocalDateTime.now(),LocalDateTime.now());

        when(ingredientRepositorie.findById(id)).thenReturn(Optional.of(existingEntity));
        doNothing().when(ingredientMapper).updateIngredientFromDTO(requestDTO, existingEntity);
        when(ingredientRepositorie.save(existingEntity)).thenReturn(updatedEntity);
        when(ingredientMapper.toIngredientDTO(updatedEntity)).thenReturn(responseDTO);

        // Act
        IngredientResponseDTO result = ingredientService.updateIngredient(id, requestDTO);

        // Assert
        assertNotNull(result);
        assertEquals(responseDTO, result);
        verify(ingredientRepositorie).findById(id);
        verify(ingredientRepositorie).save(existingEntity);
    }

    @Test
    void testDeleteIngredient() {
        // Arrange
        long id = 1L;

        when(ingredientRepositorie.existsById(id)).thenReturn(true);

        // Act
        Boolean result = ingredientService.deleteIngredient(id);

        // Assert
        assertTrue(result);
        verify(ingredientRepositorie).deleteById(id);
    }

    @Test
    void testGetIngredient() {
        // Arrange
        long id = 1L;
        IngredientEntity entity = new IngredientEntity(id, "Sugar", 10.0, 100.0, null, null, null);
        IngredientResponseDTO responseDTO = new IngredientResponseDTO("1", "Sugar", 10.0, 100.0, Unit.KG,LocalDateTime.now(), LocalDateTime.now());

        when(ingredientRepositorie.findById(id)).thenReturn(Optional.of(entity));
        when(ingredientMapper.toIngredientDTO(entity)).thenReturn(responseDTO);

        // Act
        IngredientResponseDTO result = ingredientService.getIngredient(id);

        // Assert
        assertNotNull(result);
        assertEquals(responseDTO, result);
        verify(ingredientRepositorie).findById(id);
    }

    @Test
    void testGetAllIngredient() {
        // Arrange
        String attribute = "name";
        String value = "Sugar";
        int page = 0;
        int size = 10;

        IngredientEntity entity1 = new IngredientEntity(1L, "Sugar", 10.0, 100.0, null, null, null);
        IngredientEntity entity2 = new IngredientEntity(2L, "Salt", 5.0, 50.0, null, null, null);
        List<IngredientEntity> entities = Arrays.asList(entity1, entity2);
        Page<IngredientEntity> entityPage = new PageImpl<>(entities, PageRequest.of(page, size), entities.size());

        IngredientResponseDTO dto1 = new IngredientResponseDTO("1", "Sugar", 10.0, 100.0, Unit.KG,LocalDateTime.now(), LocalDateTime.now());
        IngredientResponseDTO dto2 = new IngredientResponseDTO("2", "Salt", 5.0, 50.0, Unit.KG,LocalDateTime.now(), LocalDateTime.now());
        List<IngredientResponseDTO> dtos = Arrays.asList(dto1, dto2);
        Page<IngredientResponseDTO> dtoPage = new PageImpl<>(dtos, PageRequest.of(page, size), dtos.size());

        when(ingredientRepositorie.findAll(any(Specification.class), any(Pageable.class))).thenReturn(entityPage);
        when(ingredientMapper.toIngredientDTO(entity1)).thenReturn(dto1);
        when(ingredientMapper.toIngredientDTO(entity2)).thenReturn(dto2);

        // Act
        PaginatedResponse<IngredientResponseDTO> result = ingredientService.getAllIngredient(attribute, value, page, size);

        // Assert
        assertNotNull(result);
        assertEquals(dtoPage.getContent(), result.getContent());
        verify(ingredientRepositorie).findAll(any(Specification.class), any(Pageable.class));
    }
}
