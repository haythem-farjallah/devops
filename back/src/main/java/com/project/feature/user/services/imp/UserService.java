package com.project.feature.user.services.imp;

import com.project.all.dtos.PaginatedResponse;
import com.project.all.utils.EntitySpecification;
import com.project.feature.meal.dto.ScheduleDTO;
import com.project.feature.meal.entities.ScheduleEntity;
import com.project.feature.user.dto.UserDTO;
import com.project.feature.user.entities.*;
import com.project.feature.user.mappers.UserMapper;
import com.project.feature.user.repositories.AdminRepository;
import com.project.feature.user.repositories.CashierRepository;
import com.project.feature.user.repositories.StudentRepository;
import com.project.feature.user.repositories.UserRepository;
import com.project.feature.user.services.UserServiceInterface;
import com.project.feature.user.utils.GenerateCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService implements UserServiceInterface {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final StudentRepository studentRepository;
    private final AdminRepository adminRepository;
    private final CashierRepository cashierRepository;
    private final PasswordEncoder passwordEncoder;



    public UserService( CashierRepository cashierRepository,PasswordEncoder passwordEncoder,AdminRepository adminRepository,@Autowired StudentRepository studentRepository,@Autowired UserRepository userRepository ,@Autowired UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.studentRepository = studentRepository;
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
        this.cashierRepository = cashierRepository;


    }


    @Override
    public UserDTO createActiveStudent(UserDTO userDTO) {
        if(existsByEmail(userDTO.getEmail())) {
            throw new RuntimeException("user already exists!");
        }

        StudentEntity student = userMapper.toStudentEntity(userDTO);
        student.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        student.setCodeP(GenerateCode.generateHexCode(student.getEmail()));

        CardEntity cart = new CardEntity();
        student.setActive(true);

        student.setCart(cart);

        StudentEntity savedStudent = studentRepository.save(student);
        // Save user to database
        return userMapper.toStudentDTO(savedStudent) ;

    }

    @Override
    public UserDTO createActiveAdmin(UserDTO userDTO) {
        if(existsByEmail(userDTO.getEmail())) {
            throw new RuntimeException("user already exists!");
        }

        AdminEntity user = userMapper.toAdminEntity(userDTO);
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        user.setActive(true);

        AdminEntity savedUser = adminRepository.save(user);
        // Save user to database
        return userMapper.toAdminDTO(savedUser) ;
    }

    @Override
    public UserDTO createActiveCashier(UserDTO userDTO) {
        if(existsByEmail(userDTO.getEmail())) {
            throw new RuntimeException("user already exists!");
        }

        CashierEntity user = userMapper.toCashierEntity(userDTO);
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        user.setActive(true);

        CashierEntity savedUser = cashierRepository.save(user);
        // Save user to database
        return userMapper.toCashierDTO(savedUser) ;
    }


    @Override
    public UserDTO activateUser(Long id) {
        UserEnity userEnity = studentRepository.findById(id)
                .orElseThrow(()-> new IllegalArgumentException("user not found"));
        userEnity.setActive(true);
        return userMapper.toUserDTO(userRepository.save(userEnity));
    }

    @Override
    public UserDTO deactivateUser(Long id) {
        UserEnity userEnity = studentRepository.findById(id)
                .orElseThrow(()-> new IllegalArgumentException("user not found"));
        userEnity.setActive(false);
        return userMapper.toUserDTO(userRepository.save(userEnity));
    }

    @Override
    public PaginatedResponse<UserDTO> getAllStudents(String attribute, String  value, int page, int size) {
        Specification<StudentEntity> spec = EntitySpecification.hasAttribute(attribute, value);
        Pageable pageable = PageRequest.of(page, size);
        Page<StudentEntity> EntityPage = studentRepository.findAll(spec, pageable);



        List<UserDTO> usresDTOList = EntityPage
                .getContent()
                .stream()
                .map(userMapper::toStudentDTO)
                .collect(Collectors.toList());

        Page<UserDTO> userPage = new PageImpl<>(usresDTOList, pageable, EntityPage.getTotalElements());
        return new PaginatedResponse<UserDTO>(userPage);
    }

    @Override
    public PaginatedResponse<UserDTO> getAllUsers(String attribute, String  value, int page, int size) {

        Specification<UserEnity> spec = EntitySpecification.hasAttribute(attribute, value);
        Pageable pageable = PageRequest.of(page, size);
        Page<UserEnity> EntityPage = userRepository.findAll(spec, pageable);



        List<UserDTO> usresDTOList = EntityPage
                .getContent()
                .stream()
                .map(userMapper::toUserDTO)
                .collect(Collectors.toList());

        Page<UserDTO> userPage = new PageImpl<>(usresDTOList, pageable, EntityPage.getTotalElements());
        return new PaginatedResponse<UserDTO>(userPage);
    }

    @Override
    public UserDTO getStudentById(Long id) {
        StudentEntity studentEntity = studentRepository.findById(id)
                .orElseThrow(()-> new IllegalArgumentException("student not found"));
        return userMapper.toStudentDTO(studentEntity);
    }

    @Override
    public UserDTO getStudentByCodeP(String codeP) {
        StudentEntity studentEntity = studentRepository.findByCodeP(codeP)
                .orElseThrow(()-> new IllegalArgumentException("student not found"));
        return userMapper.toStudentDTO(studentEntity);
    }

    @Override
    public UserDTO getUserById(Long id) {
        UserEnity userEnity = studentRepository.findById(id)
                .orElseThrow(()-> new IllegalArgumentException("student not found"));
        return userMapper.toUserDTO(userEnity);
    }

    @Override
    public UserDTO updateUser(Long id, UserDTO userDTO) {
        UserEnity userEnity = userRepository.findById(id)
                .orElseThrow(()-> new IllegalArgumentException("student not found"));
        userMapper.updateUserEntity(userDTO, userEnity);

        UserEnity savedUser = userRepository.save(userEnity);

        return userMapper.toUserDTO(savedUser);
    }

    @Override
    public boolean deleteUser(Long id) {
        UserEnity userEnity = userRepository.findById(id)
                .orElseThrow(()-> new IllegalArgumentException("student not found"));
        userRepository.delete(userEnity);
        return true;
    }

    @Override
    public Boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    @Override
    public Boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }
}
