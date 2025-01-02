package com.project.all.exceptions;

import lombok.Getter;
import org.springframework.http.HttpStatus;

public class AppError extends RuntimeException{
    @Getter
    private final HttpStatus status;
    private final String message;

    public AppError(String message, HttpStatus status) {
        super(message);
        this.status = status;
        this.message = message;
    }

    @Override
    public String getMessage() {
        return message;
    }
}
