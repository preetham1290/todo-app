package com.todo.repo;

import java.util.List;

import com.todo.domain.Todo;

public interface ToDoRepo {
	public void create(Todo todo);

	public List<Todo> getAll();

	public List<Todo> getByStatus(String status);

	public void update(Todo todo);

	public void delete(String id);

	Todo getById(String id);
}
