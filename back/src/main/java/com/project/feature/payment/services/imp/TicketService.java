package com.project.feature.payment.services.imp;


import com.project.all.dtos.PaginatedResponse;
import com.project.all.utils.EntitySpecification;
import com.project.feature.meal.entities.MenuEntity;
import com.project.feature.meal.repositories.MenuRepositorie;
import com.project.feature.payment.dto.TicketDTO;
import com.project.feature.payment.entities.TicketEntity;
import com.project.feature.payment.mappers.TicketMapper;
import com.project.feature.payment.repositories.TicketRepository;
import com.project.feature.payment.services.TicketServiceInterface;
import com.project.feature.user.entities.CardEntity;
import com.project.feature.user.entities.StudentEntity;
import com.project.feature.user.repositories.CardRepository;
import com.project.feature.user.repositories.StudentRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TicketService implements TicketServiceInterface {


    private final StudentRepository studentRepository;
    private final TicketRepository ticketRepository;
    private final TicketMapper ticketMapper;
    private final CardRepository cardRepository;
    private final MenuRepositorie menuRepositorie;


    public TicketService(MenuRepositorie menuRepositorie,StudentRepository studentRepository, TicketRepository ticketRepository, TicketMapper ticketMapper, CardRepository cardRepository) {
        this.studentRepository = studentRepository;
        this.ticketRepository = ticketRepository;
        this.ticketMapper = ticketMapper;
        this.cardRepository = cardRepository;
        this.menuRepositorie = menuRepositorie;
    }



    @Override
    public TicketDTO CreateTicketWithCard(TicketDTO ticketDTO) {
        TicketEntity ticketEntity = ticketMapper.toEntity(ticketDTO);
        ticketMapper.updateCardTicket(ticketDTO,ticketEntity,menuRepositorie,ticketRepository,studentRepository,cardRepository);
        TicketEntity savedTicket= ticketRepository.save(ticketEntity);
        return ticketMapper.toDTO(savedTicket);
    }
    @Override
    public TicketDTO CreateTicketWithCash(TicketDTO ticketDTO) {
        TicketEntity ticketEntity = ticketMapper.toEntity(ticketDTO);
        ticketMapper.updateCashTicket(ticketDTO,ticketEntity,menuRepositorie,ticketRepository,studentRepository,cardRepository);
        TicketEntity savedTicket= ticketRepository.save(ticketEntity);
        return ticketMapper.toDTO(savedTicket);
    }

    @Override
    public TicketDTO getTicketById(Long id) {
        return null;
    }

    @Override
    public PaginatedResponse<TicketDTO> getAllTickets(String attribute, String  value, int page, int size) {
        Specification<TicketEntity> spec = EntitySpecification.hasAttribute(attribute,value);
        Pageable pageable = PageRequest.of(page, size);
        List<TicketDTO> ticketDTOList = ticketRepository.findAll(spec,pageable)
                .stream()
                .map(ticketMapper::toDTO)
                .collect(Collectors.toList());

        return new PaginatedResponse<>(new PageImpl<>(ticketDTOList, pageable, ticketDTOList.size()));
    }

    @Override
    public PaginatedResponse<TicketDTO> getAllTicketsByStudentId(Long studentId, int page, int size) {
        StudentEntity studentEntity = studentRepository.findById(studentId)
                .orElseThrow(()-> new IllegalArgumentException("user not found"));
        Pageable pageable = PageRequest.of(page, size);
        List<TicketDTO> ticketDTOList = ticketRepository.findByStudent(studentEntity,pageable)
                .stream()
                .map(ticketMapper::toDTO)
                .collect(Collectors.toList());
        return new PaginatedResponse<>(new PageImpl<>(ticketDTOList, pageable, ticketDTOList.size()));
    }

    @Override
    public PaginatedResponse<TicketDTO> getAllTicketsByMenuId(Long menuId, int page, int size) {
        MenuEntity menuEntity = menuRepositorie.findById(menuId)
                .orElseThrow(()-> new IllegalArgumentException("menu not found"));
        Pageable pageable = PageRequest.of(page, size);
        List<TicketDTO> ticketDTOList = ticketRepository.findByMenu(menuEntity,pageable)
                .stream()
                .map(ticketMapper::toDTO)
                .collect(Collectors.toList());
        return new PaginatedResponse<>(new PageImpl<>(ticketDTOList, pageable, ticketDTOList.size()));
    }

    @Override
    public PaginatedResponse<TicketDTO> getAllTicketsByCardId(Long cardId, int page, int size) {
        CardEntity cardEntity = cardRepository.findById(cardId)
                .orElseThrow(()-> new IllegalArgumentException("card not found"));
        Pageable pageable = PageRequest.of(page, size);
        List<TicketDTO> ticketDTOList = ticketRepository.findByCard(cardEntity,pageable)
                .stream()
                .map(ticketMapper::toDTO)
                .collect(Collectors.toList());
        return new PaginatedResponse<>(new PageImpl<>(ticketDTOList, pageable, ticketDTOList.size()));
    }

    @Override
    public PaginatedResponse<TicketDTO> getAllTicketsWithCashPayment(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        List<TicketDTO> ticketDTOList = ticketRepository.findByCardIsNull(pageable)
                .stream()
                .map(ticketMapper::toDTO)
                .collect(Collectors.toList());
        return new PaginatedResponse<>(new PageImpl<>(ticketDTOList, pageable, ticketDTOList.size()));
    }
}
