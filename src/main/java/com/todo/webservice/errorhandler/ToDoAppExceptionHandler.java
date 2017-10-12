package com.todo.webservice.errorhandler;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

@ControllerAdvice
public class ToDoAppExceptionHandler {

	@ExceptionHandler(value = { IllegalArgumentException.class })
	@ResponseBody
	public ResponseEntity<Message> illegalArgException(IllegalArgumentException exception) {
		exception.printStackTrace();
		Message errorMessage = Message.statusCode(HttpStatus.BAD_REQUEST).developerMsg(exception.getMessage())
				.message(exception.getMessage()).exception(exception.getClass().getName()).build();
		return new ResponseEntity<Message>(errorMessage, HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(value = { Exception.class })
	@ResponseBody
	public ResponseEntity<Message> exception(Exception exception) {
		exception.printStackTrace();
		Message errorMessage = Message.statusCode(HttpStatus.INTERNAL_SERVER_ERROR).developerMsg(exception.getMessage())
				.message(exception.getMessage()).exception(exception.getClass().getName()).build();
		return new ResponseEntity<Message>(errorMessage, HttpStatus.INTERNAL_SERVER_ERROR);
	}

}
