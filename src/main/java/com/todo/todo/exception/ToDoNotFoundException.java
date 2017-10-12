package com.todo.todo.exception;

public class ToDoNotFoundException extends Exception {

	private static final long serialVersionUID = 4540276917784131778L;

	private Exception exception;

	public ToDoNotFoundException(String message, Exception exception) {
		super(message);
		this.exception = exception;
	}

	public Exception getException() {
		return exception;
	}
}