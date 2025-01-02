package com.project.feature.payment.services;

import com.project.all.dtos.PaginatedResponse;
import com.project.feature.payment.dto.TicketDTO;
import org.springframework.data.domain.Page;

import java.util.List;

public interface TicketServiceInterface {


    TicketDTO CreateTicketWithCard(TicketDTO ticketDTO);
    TicketDTO CreateTicketWithCash(TicketDTO ticketDTO);



    TicketDTO getTicketById(Long id);

    PaginatedResponse<TicketDTO> getAllTickets(String attribute, String  value, int page, int size);

    PaginatedResponse<TicketDTO> getAllTicketsByStudentId(Long studentId, int page, int size);

    PaginatedResponse<TicketDTO> getAllTicketsByMenuId(Long menuId, int page, int size);

    PaginatedResponse<TicketDTO> getAllTicketsByCardId(Long cardId, int page, int size);

    PaginatedResponse<TicketDTO> getAllTicketsWithCashPayment( int page, int size);


}
