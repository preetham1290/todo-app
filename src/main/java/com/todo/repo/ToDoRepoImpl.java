package com.todo.repo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.todo.domain.Todo;

@Repository
public class ToDoRepoImpl implements ToDoRepo {

	@Autowired
	private MongoRepoImpl repoImpl;

	@SuppressWarnings("unused")
	@Autowired
	private ToDoMongoOperation mongoOperation;

	@Override
	public void create(Todo todo) {
		repoImpl.insert(todo);
	}

	@Override
	public Todo getById(String id) {
		return repoImpl.findOne(id);
	}

	@Override
	public List<Todo> getAll() {
		return repoImpl.findAll();
	}

	@Override
	public List<Todo> getByStatus(String status) {
		return repoImpl.findByStatus(status);
	}

	@Override
	public void update(Todo todo) {
		repoImpl.save(todo);
	}

	@Override
	public void delete(String id) {
		repoImpl.delete(id);
	}

}
