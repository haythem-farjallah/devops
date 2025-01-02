package com.project.feature.user.controllers;

import com.project.all.dtos.ApiSuccessResponse;
import com.project.all.dtos.PaginatedResponse;
import com.project.feature.user.dto.UserDTO;
import com.project.feature.user.repositories.UserRepository;
import com.project.feature.user.services.imp.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserRepository userRepository;
    private UserService userService;

    public UserController(@Autowired UserService userService, UserRepository userRepository) {
        this.userService = userService;
        this.userRepository = userRepository;
    }


//    @GetMapping("/me")
//    @PreAuthorize("hasRole('ROLE_STUDENT') or hasRole('ROLE_ADMIN')")
//    public ResponseEntity<ApiSuccessResponse<UserResponseDto>> getCurrentUser(@AuthenticationPrincipal UserDetails userDetails) {
//        UserEnity user = userRepository.findByEmail(userDetails.getUsername())
//                .orElseThrow(() -> new RuntimeException("User not found"));
//
//        UserResponseDto userResponse = new UserResponseDto(user.getEmail(), user.getRole().name());
//
//        ApiSuccessResponse<UserResponseDto> response = new ApiSuccessResponse<>(
//                "success",
//                userResponse
//        );
//
//        return ResponseEntity.ok(response);
//    }


    @PostMapping("/student/active")
    public ResponseEntity<ApiSuccessResponse<UserDTO>> createActiveStudent(@Valid @RequestBody UserDTO userDTO) {
         UserDTO user =  userService.createActiveStudent(userDTO);
        ApiSuccessResponse<UserDTO> response = new ApiSuccessResponse<>(
                "success",
                user
        );
        return new ResponseEntity<>(response, HttpStatus.OK);
    }


    @PostMapping("/admin/active")
    public ResponseEntity<ApiSuccessResponse<UserDTO>> createActiveAdmin(@Valid @RequestBody UserDTO userDTO) {
        UserDTO user =  userService.createActiveAdmin(userDTO);
        ApiSuccessResponse<UserDTO> response = new ApiSuccessResponse<>(
                "success",
                user
        );
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/cashier/active")
    public ResponseEntity<ApiSuccessResponse<UserDTO>> createActiveCashier(@Valid @RequestBody UserDTO userDTO) {
        UserDTO user =  userService.createActiveCashier(userDTO);
        ApiSuccessResponse<UserDTO> response = new ApiSuccessResponse<>(
                "success",
                user
        );
        return new ResponseEntity<>(response, HttpStatus.OK);
    }


    @PutMapping("/activate/{id}")
    public ResponseEntity<ApiSuccessResponse<UserDTO>> activateUser(@PathVariable(value = "id") Long userId) {
        UserDTO user =  userService.activateUser(userId);
        ApiSuccessResponse<UserDTO> response = new ApiSuccessResponse<>(
                "success",
                user
        );
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @PutMapping("/deactivate/{id}")
    public ResponseEntity<ApiSuccessResponse<UserDTO>> deactivateUser(@PathVariable(value = "id") Long userId) {
        UserDTO user =  userService.deactivateUser(userId);
        ApiSuccessResponse<UserDTO> response = new ApiSuccessResponse<>(
                "success",
                user
        );
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/students/all")
    public ResponseEntity<ApiSuccessResponse< PaginatedResponse<UserDTO>>> getAllStudents(
            @RequestParam(required = false ,defaultValue = "username") String attribute,
            @RequestParam(required = false ,defaultValue = "") String  value,
            @RequestParam(required = false,defaultValue = "0") int page,
            @RequestParam(required = false,defaultValue = "10") int size
    ){
        PaginatedResponse<UserDTO> users = userService.getAllStudents(attribute,value,page,size);
        ApiSuccessResponse< PaginatedResponse<UserDTO>> response = new ApiSuccessResponse<>("success",users);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/users/all")
    public ResponseEntity<ApiSuccessResponse< PaginatedResponse<UserDTO>>> getAllUsers(
            @RequestParam(required = false ,defaultValue = "username") String attribute,
            @RequestParam(required = false ,defaultValue = "") String  value,
            @RequestParam(required = false,defaultValue = "0") int page,
            @RequestParam(required = false,defaultValue = "10") int size
    ){
        PaginatedResponse<UserDTO> users = userService.getAllUsers(attribute,value,page,size);
        ApiSuccessResponse< PaginatedResponse<UserDTO>> response = new ApiSuccessResponse<>("success",users);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }




    @PutMapping("/{id}")
    public ResponseEntity<ApiSuccessResponse<UserDTO>> updateUser(@PathVariable(value = "id") Long userId,
                                        @RequestBody UserDTO userDTO) {
        UserDTO updatedUser = userService.updateUser(userId, userDTO);
        ApiSuccessResponse<UserDTO> response = new ApiSuccessResponse<>("success", updatedUser);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/student/{id}")
    public ResponseEntity<ApiSuccessResponse<UserDTO>> getStudentById(@PathVariable(value = "id") Long userId) {
        UserDTO user = userService.getStudentById(userId);
        ApiSuccessResponse<UserDTO> response = new ApiSuccessResponse<>("success", user);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @GetMapping("/user/{id}")
    public ResponseEntity<ApiSuccessResponse<UserDTO>> getUserById(@PathVariable(value = "id") Long userId) {
        UserDTO user = userService.getUserById(userId);
        ApiSuccessResponse<UserDTO> response = new ApiSuccessResponse<>("success", user);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/code/{code}")
    public ResponseEntity<ApiSuccessResponse<UserDTO>> getStudentByCode(@PathVariable(value = "code") String code) {
        UserDTO user = userService.getStudentByCodeP(code);
        ApiSuccessResponse<UserDTO> response = new ApiSuccessResponse<>("success", user);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

  @DeleteMapping("/{id}")
    public ResponseEntity<ApiSuccessResponse<Boolean>> deleteUser(@PathVariable(value = "id") Long userId) {
      boolean isDeleted = userService.deleteUser(userId);
      if (isDeleted) {
          ApiSuccessResponse<Boolean> apiSuccessResponse = new ApiSuccessResponse<>("success", true);
          return new ResponseEntity<>(apiSuccessResponse, HttpStatus.NO_CONTENT);
      } else {
          ApiSuccessResponse<Boolean> apiSuccessResponse = new ApiSuccessResponse<>("error", false);
          return new ResponseEntity<>(apiSuccessResponse, HttpStatus.NOT_FOUND);
      }
  }
}
