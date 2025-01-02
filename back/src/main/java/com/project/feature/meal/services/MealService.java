package com.project.feature.meal.services;

import com.project.all.dtos.PaginatedResponse;
import com.project.all.utils.EntitySpecification;
import com.project.feature.meal.dto.*;
import com.project.feature.meal.entities.IngredientEntity;
import com.project.feature.meal.entities.LineIngredientEntity;
import com.project.feature.meal.entities.MealEntity;
import com.project.feature.meal.mappers.IngredientMapper;
import com.project.feature.meal.mappers.MealMapper;
import com.project.feature.meal.repositories.IngredientRepositorie;
import com.project.feature.meal.repositories.LineIngredientRepositorie;
import com.project.feature.meal.repositories.MealRepositorie;
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
public class MealService implements MealServiceInterface {

    private final MealRepositorie mealRepositorie;
    private final IngredientRepositorie ingredientRepositorie;
    private final LineIngredientRepositorie lineIngredientRepositorie;

    private final MealMapper mealMapper;

    public MealService(LineIngredientRepositorie lineIngredientRepositorie, MealMapper mealMapper, MealRepositorie mealRepositorie, IngredientRepositorie ingredientRepositorie) {
        this.mealRepositorie = mealRepositorie;
        this.ingredientRepositorie = ingredientRepositorie;
        this.lineIngredientRepositorie = lineIngredientRepositorie;
        this.mealMapper = mealMapper;
    }



    public MealResponseDTO addMeal(MealRequestDTO mealRequestDTO) {
        MealEntity mealEntity = new MealEntity();
        mealEntity.setName(mealRequestDTO.getName());
        mealEntity.setDescription(mealRequestDTO.getDescription());
        mealEntity.setPrix(mealRequestDTO.getPrix());

        MealEntity savedMeal = mealRepositorie.save(mealEntity);
        Set<LineIngredientEntity> listIng = createLineIngredient(savedMeal, mealRequestDTO.getIngredients());

        savedMeal.setLineIngredient(listIng);
        savedMeal.setCout(calculCoutTotalOfMeal(savedMeal));
        savedMeal = mealRepositorie.save(savedMeal);

        return mealMapper.toMealDto(savedMeal);
    }

    public MealResponseDTO updateMeal(long id,MealRequestDTO mealRequestDTO) {
      MealEntity meal = mealRepositorie.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("meal not found"));
      mealMapper.updateEntity(mealRequestDTO, meal);
      return mealMapper.toMealDto(mealRepositorie.save(meal));
    }



    public MealResponseDTO getMeal(long id) {
        MealEntity meal = mealRepositorie.findById(id).orElseThrow(() -> new IllegalArgumentException("Meal not found"));
        return mealMapper.toMealDto(meal);
    }

    @Override
    public PaginatedResponse<MealResponseDTO> getAllMeal(String attribute, String  value, int page, int size) {
        Specification<MealEntity> spec = EntitySpecification.hasAttribute(attribute,value);
        Pageable pageable = PageRequest.of(page, size);
        Page<MealEntity> mealEntityPage = mealRepositorie.findAll(spec, pageable);

// Mappe chaque élément de la page vers le DTO correspondant
        List<MealResponseDTO> ingDTOList = mealEntityPage
                .getContent()
                .stream()
                .map(mealMapper::toMealDto)
                .collect(Collectors.toList());

        Page<MealResponseDTO> ingPage = new PageImpl<>(ingDTOList, pageable, mealEntityPage.getTotalElements());
        return new PaginatedResponse<MealResponseDTO>(ingPage);

    }

    @Override
    public Boolean deleteMeal(long id) {
        if (!mealRepositorie.existsById(id)) {
            throw new IllegalArgumentException("meal not found");
        }
        mealRepositorie.deleteById(id);
        return true;
    }

    public Set<LineIngredientEntity> createLineIngredient(MealEntity meal, Set<IngrediantLine> listIngredient) {

        Set<LineIngredientEntity> listLineIngredients = new HashSet<>();

        for (IngrediantLine ingredientLine : listIngredient) {
            IngredientEntity ingredientEntity = ingredientRepositorie.findById(ingredientLine.getIdIngrediant())
                    .orElseThrow(() -> new IllegalArgumentException("meal not found"));

            double ingredientCost = ingredientEntity.getPrix() * ingredientLine.getQuantity();

            LineIngredientEntity lineIngredientEntity = new LineIngredientEntity(
                    ingredientCost,
                    ingredientLine.getQuantity(),
                    ingredientEntity
            );
            listLineIngredients.add(lineIngredientEntity);
        }

        return listLineIngredients;
    }

    @Override
    public Double addLineIngredient(long idMeal, IngrediantLine ingrediantLineDTO) {
        IngredientEntity   ingredient = ingredientRepositorie.findById(ingrediantLineDTO.getIdIngrediant())
                .orElseThrow(()-> new IllegalArgumentException("line not found"));
        MealEntity meal = mealRepositorie.findById(idMeal)
                .orElseThrow(()-> new IllegalArgumentException("meal not found"));


        meal.getLineIngredient().stream()
                .filter(line -> line.getIngredient().getId().equals(ingrediantLineDTO.getIdIngrediant()))
                .findFirst()
                .ifPresentOrElse(
                        line -> {
                            line.setQte(line.getQte() + ingrediantLineDTO.getQuantity());
                            line.setCoutIngredient(line.getQte() * line.getIngredient().getPrix());
                        },
                        () -> {
                            LineIngredientEntity newLine = LineIngredientEntity.builder()
                                    .ingredient(ingredient)
                                    .coutIngredient(ingredient.getPrix() * ingrediantLineDTO.getQuantity())
                                    .qte(ingrediantLineDTO.getQuantity())
                                    .build();
                            meal.getLineIngredient().add(newLine);
                        }
                );


        double totalCout = calculCoutTotalOfMeal(meal);
        meal.setCout(totalCout);


        mealRepositorie.save(meal);
        return totalCout;
    }

    @Override
    public Double updateLineIngredient(long idIng, long idMeal, LineIngredientDTO lineIngredientDTO) {

        LineIngredientEntity lineIngredient = lineIngredientRepositorie.findById(idIng)
                .orElseThrow(()-> new IllegalArgumentException("line not found"));

        double prix = lineIngredient.getCoutIngredient() / lineIngredient.getQte();

        lineIngredientDTO.setCoutIngredient(prix * lineIngredientDTO.getQte());

        mealMapper.updateLineIngredientFromDTO(lineIngredientDTO, lineIngredient);

        lineIngredientRepositorie.save(lineIngredient);

        MealEntity meal = mealRepositorie.findById(idMeal)
                .orElseThrow(()-> new IllegalArgumentException("line not found"));

        double totalCout = calculCoutTotalOfMeal(meal);
        meal.setCout(totalCout);
        mealRepositorie.save(meal);

        return totalCout;
    }

    @Override
    public Double deleteLineIngredient(long id, long idMeal) {
        LineIngredientEntity lineIngredient = lineIngredientRepositorie.findById(id)
                .orElseThrow(()-> new IllegalArgumentException("line not found"));
        MealEntity meal = mealRepositorie.findById(idMeal)
                .orElseThrow(()-> new IllegalArgumentException("meal not found"));

        double newCout = meal.getCout()-lineIngredient.getCoutIngredient();
        Set<LineIngredientEntity> newList =meal.getLineIngredient();
        newList.remove(lineIngredient);

        meal.setCout(newCout);
        meal.setLineIngredient(newList);

        mealRepositorie.save(meal);
        lineIngredientRepositorie.deleteById(id);

        return newCout;
    }

    public double calculCoutTotalOfMeal(MealEntity meal) {
        double total = 0;

        for (LineIngredientEntity ingredientLine : meal.getLineIngredient()) {

            double ingredientCost = ingredientLine.getIngredient().getPrix() * ingredientLine.getQte();
            total+=ingredientCost;
        }

        return total;
    }
}
