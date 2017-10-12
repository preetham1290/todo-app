package com.todo.service;

import java.util.List;

import com.todo.domain.Todo;

public interface ToDoService {

	public void create(Todo todo);

	public List<Todo> getAll();

	public List<Todo> getByStatus(String status);

	public void update(Todo todo);

	public void delete(String id);
}
