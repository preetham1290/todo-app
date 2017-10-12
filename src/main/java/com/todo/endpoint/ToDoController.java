package com.todo.endpoint;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.todo.domain.Status;
import com.todo.domain.Todo;
import com.todo.service.ToDoService;
import com.todo.webservice.errorhandler.Message;
import com.todo.webservice.errorhandler.MessageBuilder;

@RestController
@RequestMapping(value = "todo")
public class ToDoController {

	@Autowired
	private ToDoService toDoService;

	@PostMapping
	public Message create(@RequestBody Todo todo) {
		toDoService.create(todo);
		return MessageBuilder.statusCode(HttpStatus.OK).developerMsg("New task saved in db")
				.message("Task created successfully").build();
	}

	@GetMapping
	public List<Todo> getAll() {
		return toDoService.getAll();
	}

	@GetMapping(params = "status")
	public List<Todo> getByStatus(@RequestParam String status) {
		return toDoService.getByStatus(status);
	}

	@PutMapping
	public Message update(@RequestBody Todo todo) {
		toDoService.update(todo);
		return MessageBuilder.statusCode(HttpStatus.OK).developerMsg("task updated in db")
				.message("Task updated successfully").build();
	}

	@DeleteMapping(value="{id}")
	public Message delete(@PathVariable String id) {
		toDoService.delete(id);
		return MessageBuilder.statusCode(HttpStatus.OK).developerMsg("given task has been deleted from db")
				.message("Task deleted successfully").build();
	}

	@GetMapping("status")
	public Status[] getAllStatus() {
		return Status.values();
	}
}
