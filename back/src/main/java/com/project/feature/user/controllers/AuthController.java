package com.project.feature.user.controllers;

import com.project.all.dtos.ApiSuccessResponse;
import com.project.feature.user.dto.UserDTO;
import com.project.feature.user.services.imp.AuthService;
import com.project.feature.user.dto.LoginRequest;
import com.project.feature.user.dto.Tokens;
import com.project.all.utils.NotificationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor

public class AuthController {
    private final AuthService authService;



    @Autowired
    private NotificationService notificationService ;


    @PostMapping("/register-student")
    public ResponseEntity<ApiSuccessResponse<String>> registerStudentNotActive(@RequestBody UserDTO userDTO) {
      UserDTO user =  authService.registerStudentNotActive(userDTO);
        ApiSuccessResponse<String> response = new ApiSuccessResponse<>(
                "success",
                "Student registered successfully"
        );
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    //notificationService.sendMail("mokni.ahmed.am@gmail.com","si zebi","ki nikek cht9oull");
    // notificationService.sendSms("+21653560362","ki nikek cht9oull");

    @PostMapping("/login")
    public ResponseEntity<ApiSuccessResponse<Tokens>> authenticateUser(@RequestBody LoginRequest request) {
        Tokens tokens = authService.authenticate(request.getEmail(), request.getPassword());

        ApiSuccessResponse<Tokens> response = new ApiSuccessResponse<>(
                "success",
                tokens
        );

        return ResponseEntity.ok(response);
    }


    @PostMapping("/refresh-token")
    public ResponseEntity<ApiSuccessResponse<Tokens>> refreshToken(@Valid @RequestBody Tokens request) {
        String refreshToken = request.getRefreshToken();

        Tokens tokens = authService.refreshToken(refreshToken);

        ApiSuccessResponse<Tokens> response = new ApiSuccessResponse<>(
                "success",
                tokens
        );

        return ResponseEntity.ok(response);
    }



}
