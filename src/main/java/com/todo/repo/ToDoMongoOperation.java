package com.todo.repo;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.todo.domain.Todo;

@Repository
public interface ToDoMongoOperation extends MongoRepository<Todo, String> {

}
