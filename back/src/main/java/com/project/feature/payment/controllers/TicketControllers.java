package com.project.feature.payment.controllers;


import com.project.all.dtos.ApiSuccessResponse;
import com.project.all.dtos.PaginatedResponse;
import com.project.feature.payment.dto.TicketDTO;
import com.project.feature.payment.services.imp.TicketService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tickets")
public class TicketControllers {
    private final TicketService ticketService;

    public TicketControllers(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @PostMapping("/add/card")
    public ResponseEntity<ApiSuccessResponse<TicketDTO>> CreateTicketWithCard(@RequestBody TicketDTO ticketDTO){
        TicketDTO createdTicket = ticketService.CreateTicketWithCard(ticketDTO);
        ApiSuccessResponse<TicketDTO> response = new ApiSuccessResponse<>("success", createdTicket);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PostMapping("/add/cash")
    public ResponseEntity<ApiSuccessResponse<TicketDTO>> CreateTicketWithCash(@RequestBody TicketDTO ticketDTO){
        TicketDTO createdTicket = ticketService.CreateTicketWithCash(ticketDTO);
        ApiSuccessResponse<TicketDTO> response = new ApiSuccessResponse<>("success", createdTicket);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<ApiSuccessResponse<PaginatedResponse<TicketDTO>>> getAllTickets(
            @RequestParam(required = false ,defaultValue = "amount") String attribute,
            @RequestParam(required = false ,defaultValue = "") String  value,
            @RequestParam(required = false,defaultValue = "0") int page,
            @RequestParam(required = false,defaultValue = "10") int size
    ){
        PaginatedResponse<TicketDTO> tickets = ticketService.getAllTickets(attribute,value,page,size);
        ApiSuccessResponse<PaginatedResponse<TicketDTO>> response = new ApiSuccessResponse<>("success", tickets);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
    @GetMapping("/student/{id}")
    public ResponseEntity<ApiSuccessResponse<PaginatedResponse<TicketDTO>>> getAllTicketsByStudent(
            @PathVariable(value = "id") Long studentId,
            @RequestParam(required = false,defaultValue = "0") int page,
            @RequestParam(required = false,defaultValue = "10") int size
    ){
        PaginatedResponse<TicketDTO> tickets = ticketService.getAllTicketsByStudentId(studentId,page,size);
        ApiSuccessResponse<PaginatedResponse<TicketDTO>> response = new ApiSuccessResponse<>("success", tickets);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
    @GetMapping("/menu/{id}")
    public ResponseEntity<ApiSuccessResponse<PaginatedResponse<TicketDTO>>> getAllTicketsByMenu(
            @PathVariable(value = "id") Long menuId,
            @RequestParam(required = false,defaultValue = "0") int page,
            @RequestParam(required = false,defaultValue = "10") int size
    ){
        PaginatedResponse<TicketDTO> tickets = ticketService.getAllTicketsByMenuId(menuId,page,size);
        ApiSuccessResponse<PaginatedResponse<TicketDTO>> response = new ApiSuccessResponse<>("success", tickets);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/card/{id}")
    public ResponseEntity<ApiSuccessResponse<PaginatedResponse<TicketDTO>>> getAllTicketsByCard(
            @PathVariable(value = "id") Long cardId,
            @RequestParam(required = false,defaultValue = "0") int page,
            @RequestParam(required = false,defaultValue = "10") int size
    ){
        PaginatedResponse<TicketDTO> tickets = ticketService.getAllTicketsByCardId(cardId,page,size);
        ApiSuccessResponse<PaginatedResponse<TicketDTO>> response = new ApiSuccessResponse<>("success", tickets);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
    @GetMapping("/cash")
    public ResponseEntity<ApiSuccessResponse<PaginatedResponse<TicketDTO>>> getAllTicketsWithCashPayment(

            @RequestParam(required = false,defaultValue = "0") int page,
            @RequestParam(required = false,defaultValue = "10") int size
    ){
        PaginatedResponse<TicketDTO> tickets = ticketService.getAllTicketsWithCashPayment(page,size);
        ApiSuccessResponse<PaginatedResponse<TicketDTO>> response = new ApiSuccessResponse<>("success", tickets);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

}
