package com.todo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import com.todo.domain.Status;
import com.todo.domain.Todo;
import com.todo.repo.ToDoRepo;

@Service
public class ToDoServiceImpl implements ToDoService {

	@Autowired
	private ToDoRepo toDoRepo;

	@Override
	public void create(Todo todo) {
		Assert.isNull(todo.getId(), "ID should be null while creating");
		Assert.hasLength(todo.getTopic(), "Topic cannot be empty");
		Assert.hasLength(todo.getDescription(), "Description cannot be empty");
		todo.setStatus(Status.PENDING);
		toDoRepo.create(todo);
	}

	@Override
	public List<Todo> getAll() {
		return toDoRepo.getAll();
	}

	@Override
	public List<Todo> getByStatus(String status) {
		Assert.hasLength(status, "Status cannot be empty");
		return toDoRepo.getByStatus(status);
	}

	@Override
	public void update(Todo todo) {
		Assert.isTrue(toDoRepo.getById(todo.getId()) != null, "Object does not exist!!");
		toDoRepo.update(todo);
	}

	@Override
	public void delete(String id) {
		Assert.hasLength(id, "ID cannot be empty");
		Assert.isTrue(toDoRepo.getById(id) != null, "Object does not exist!!");
		toDoRepo.delete(id);
	}

}
