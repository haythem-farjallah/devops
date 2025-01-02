package com.project.feature.user.controllers;


import com.project.all.dtos.ApiSuccessResponse;
import com.project.feature.user.dto.CardDTO;
import com.project.feature.user.services.imp.CardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/carts")
public class CardControllers {
    private final CardService cardService;

    public CardControllers(@Autowired CardService cardService) {
        this.cardService = cardService;
    }


    @PutMapping("/activate/{id}")
    public ResponseEntity<ApiSuccessResponse<CardDTO>> activateCard(@PathVariable(value = "id") Long cartId){
        CardDTO cardDTO = cardService.activateCard(cartId);
        ApiSuccessResponse<CardDTO> response = new ApiSuccessResponse<>(
                "success",
                cardDTO
        );
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @PutMapping("/deactivate/{id}")
    public ResponseEntity<ApiSuccessResponse<CardDTO>> deactivateCard(@PathVariable(value = "id") Long cartId){
        CardDTO cardDTO = cardService.deactivateCard(cartId);
        ApiSuccessResponse<CardDTO> response = new ApiSuccessResponse<>(
                "success",
                cardDTO
        );
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @PutMapping("/add/{id}")
    public ResponseEntity<ApiSuccessResponse<CardDTO>> addMoneyToCard(@PathVariable(value = "id") Long cartId , @RequestBody CardDTO cartDs){
        CardDTO cardDTO = cardService.addMoneyToCard(cartId ,cartDs.getAmount());
        ApiSuccessResponse<CardDTO> response = new ApiSuccessResponse<>(
                "success",
                cardDTO
        );
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
