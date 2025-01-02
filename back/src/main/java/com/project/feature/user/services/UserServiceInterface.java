package com.project.feature.user.services;

import com.project.all.dtos.PaginatedResponse;
import com.project.feature.user.dto.UserDTO;
import org.springframework.data.domain.Page;

public interface UserServiceInterface {
    UserDTO createActiveStudent(UserDTO userDTO);
    UserDTO createActiveAdmin(UserDTO userDTO);
    UserDTO createActiveCashier(UserDTO userDTO);

    UserDTO activateUser(Long id);
    UserDTO deactivateUser(Long id);





    public PaginatedResponse<UserDTO> getAllStudents(String  attribute, String  value, int page, int size) ;
    public PaginatedResponse<UserDTO> getAllUsers(String  attribute, String  value, int page, int size) ;

    UserDTO getStudentById(Long id);
    UserDTO getStudentByCodeP(String codeP);
    UserDTO getUserById(Long id);

    UserDTO updateUser(Long id, UserDTO user);
    boolean deleteUser(Long id);

    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);
}
