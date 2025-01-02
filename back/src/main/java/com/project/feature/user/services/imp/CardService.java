package com.project.feature.user.services.imp;

import com.project.feature.user.dto.CardDTO;
import com.project.feature.user.entities.CardEntity;
import com.project.feature.user.mappers.CardMapper;
import com.project.feature.user.mappers.UserMapper;
import com.project.feature.user.repositories.CardRepository;
import com.project.feature.user.repositories.StudentRepository;
import com.project.feature.user.services.CardServiceInterface;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class CardService implements CardServiceInterface {

    private final UserMapper userMapper;
    private final CardMapper cardMapper;
    private final StudentRepository studentRepository;
    private final CardRepository cardRepository;

    public CardService(CardMapper cardMapper, UserMapper userMapper, StudentRepository studentRepository, CardRepository cardRepository) {
        this.userMapper = userMapper;
        this.studentRepository = studentRepository;
        this.cardRepository = cardRepository;
        this.cardMapper = cardMapper;
    }

    @Override
    public CardDTO activateCard(Long id) {
        CardEntity cardEntity = cardRepository.findById(id)
                .orElseThrow(()-> new IllegalArgumentException("cart not found"));
        cardMapper.changeDates(cardEntity);
        CardEntity savedCardEntity = cardRepository.save(cardEntity);
        return cardMapper.toDTO(savedCardEntity);
    }

    @Override
    public CardDTO deactivateCard(Long id) {
        CardEntity cardEntity = cardRepository.findById(id)
                .orElseThrow(()-> new IllegalArgumentException("cart not found"));
        cardEntity.setActive(false);
        cardEntity.setActivationDate(null);
        cardEntity.setExpiryDate(new Date());
        CardEntity savedCardEntity = cardRepository.save(cardEntity);
        return cardMapper.toDTO(savedCardEntity);
    }

    @Override
    public CardDTO addMoneyToCard(Long id, double amount) {
        CardEntity cardEntity = cardRepository.findById(id)
                .orElseThrow(()-> new IllegalArgumentException("cart not found"));

        if (!cardEntity.isActive())
            throw new IllegalArgumentException("cart is not  active");

        Date currentDate = new Date();
        if (currentDate.before(cardEntity.getExpiryDate()))
            cardMapper.changeDates(cardEntity);

        cardEntity.setBalance(cardEntity.getBalance() + amount);
        CardEntity savedCardEntity = cardRepository.save(cardEntity);
        return cardMapper.toDTO(savedCardEntity);

    }
}
