package com.project.feature.user.services.imp;

import com.project.all.configs.JwtTokenProvider;
import com.project.feature.user.dto.Tokens;
import com.project.feature.user.dto.UserDTO;
import com.project.feature.user.entities.CardEntity;
import com.project.feature.user.entities.StudentEntity;
import com.project.feature.user.entities.UserEnity;
import com.project.feature.user.mappers.UserMapper;
import com.project.feature.user.repositories.StudentRepository;
import com.project.feature.user.repositories.UserRepository;
import com.project.feature.user.utils.GenerateCode;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final StudentRepository studentRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserMapper  userMapper;

    public AuthService(AuthenticationManager authenticationManager, UserRepository userRepository, StudentRepository studentRepository, PasswordEncoder passwordEncoder, JwtTokenProvider jwtTokenProvider, UserMapper userMapper) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.studentRepository = studentRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
        this.userMapper = userMapper;
    }





    public UserDTO registerStudentNotActive(UserDTO userDTO) {
        // Check if user already exists
        if (userRepository.existsByEmail(userDTO.getEmail())) {
            throw new RuntimeException("Email is already in use");
        }
        // Create new user
        StudentEntity student = userMapper.toStudentEntity(userDTO);
        student.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        student.setCodeP(GenerateCode.generateHexCode(student.getEmail()));

        CardEntity cart = new CardEntity();
        cart.setActive(false);

        student.setCart(cart);

        StudentEntity savedStudent = studentRepository.save(student);
        // Save user to database
        return userMapper.toStudentDTO(savedStudent) ;

    }


    public Tokens authenticate(String email, String password) {
        try {
            UserEnity userEnity = userRepository.findByEmail(email)
                    .orElseThrow(()-> new IllegalArgumentException("user not found"));
            // Perform authentication
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(email, password)
            );

            // Get authenticated user details
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();

            // Generate tokens
            String accessToken = jwtTokenProvider.generateAccessToken(userDetails);
            String refreshToken = jwtTokenProvider.generateRefreshToken(userDetails);

            // Return tokens
            return new Tokens(accessToken, refreshToken,userMapper.toUserDTO(userEnity));
        } catch (BadCredentialsException ex) {
            throw new RuntimeException("Invalid email or password");
        } catch (AuthenticationException ex) {
            throw new RuntimeException("Authentication failed");
        }
    }
    public Tokens refreshToken(String refreshToken) {
        // Validate refresh token
        if (jwtTokenProvider.validateToken(refreshToken)) {
            // Get email from refresh token
            String email = jwtTokenProvider.getEmailFromToken(refreshToken);

            UserEnity userEnity = userRepository.findByEmail(email)
                    .orElseThrow(()-> new IllegalArgumentException("user not found"));
            // Load user details
            UserDetails userDetails = loadUserByEmail(email);

            // Generate new tokens
            String newAccessToken = jwtTokenProvider.generateAccessToken(userDetails);
            String newRefreshToken = jwtTokenProvider.generateRefreshToken(userDetails);

            // Return new tokens
            return new Tokens(newAccessToken, newRefreshToken,userMapper.toUserDTO(userEnity));
        } else {
            throw new RuntimeException("Invalid refresh token");
        }
    }

    private UserDetails loadUserByEmail(String email) {
        UserEnity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getEmail())
                .password(user.getPassword())
                .authorities(user.getRole().name())
                .build();
    }
}
