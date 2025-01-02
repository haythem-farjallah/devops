package com.project.feature.user.mappers;

import com.project.feature.user.dto.UserDTO;
import com.project.feature.user.entities.AdminEntity;
import com.project.feature.user.entities.CashierEntity;
import com.project.feature.user.entities.StudentEntity;
import com.project.feature.user.entities.UserEnity;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserEnity   toUserEntity(UserDTO userDTO);

    StudentEntity toStudentEntity(UserDTO userDTO);
    AdminEntity toAdminEntity(UserDTO userDTO);
    CashierEntity toCashierEntity(UserDTO userDTO);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateUserEntity( UserDTO userDTO, @MappingTarget UserEnity userEnity);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateStudentEntity( UserDTO userDTO, @MappingTarget StudentEntity studentEntity);

    UserDTO toUserDTO( UserEnity userEnity);

    @Mapping(source = "codeP" ,target = "codeP")
    UserDTO toStudentDTO( StudentEntity studentEntity);
    UserDTO toAdminDTO( AdminEntity adminEntity);
    UserDTO toCashierDTO( CashierEntity cashierEntity);

}
