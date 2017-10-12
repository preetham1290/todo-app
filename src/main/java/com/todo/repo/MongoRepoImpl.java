package com.todo.repo;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.todo.domain.Todo;

@Repository
public interface MongoRepoImpl extends MongoRepository<Todo, String> {

	List<Todo> findByStatus(String status);

}
