package com.project.feature.user.services;

import com.project.feature.user.dto.CardDTO;

public interface CardServiceInterface {

    CardDTO activateCard(Long id);

    CardDTO deactivateCard(Long id);

    CardDTO addMoneyToCard(Long id, double amount);





}
