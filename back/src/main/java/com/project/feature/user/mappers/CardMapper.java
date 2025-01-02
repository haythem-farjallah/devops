package com.project.feature.user.mappers;

import com.project.feature.user.dto.CardDTO;
import com.project.feature.user.entities.CardEntity;
import org.mapstruct.*;

import java.util.Calendar;
import java.util.Date;

@Mapper(componentModel = "spring")
public interface CardMapper {

    CardEntity toEntity(CardDTO cardDTO);


    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntity(CardDTO cardDTO, @MappingTarget CardEntity cardEntity);

    CardDTO toDTO(CardEntity cardEntity);

    @AfterMapping
    default void changeDates(@MappingTarget CardEntity cardEntity) {
        cardEntity.setActivationDate(new Date());

        // Set the expiry date based on the current month
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date()); // Get the current date

        // Check the current month and set the expiry date accordingly
        int currentMonth = calendar.get(Calendar.MONTH); // JANUARY = 0, FEBRUARY = 1, ..., DECEMBER = 11

        // If current month is September (8) or later, set expiry to June 30th of next year
        if (currentMonth >= Calendar.SEPTEMBER) {
            calendar.set(Calendar.YEAR, calendar.get(Calendar.YEAR) + 1); // Set to next year
        }

        // Set the expiry date to June 30th
        calendar.set(Calendar.MONTH, Calendar.JUNE); // Set to June
        calendar.set(Calendar.DAY_OF_MONTH, 30); // Set to 30th

        cardEntity.setActive(true);
        // Set the expiry date
        cardEntity.setExpiryDate(calendar.getTime()) ;
    }
}
