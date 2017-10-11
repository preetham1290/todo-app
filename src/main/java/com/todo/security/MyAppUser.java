package com.todo.security;

import java.util.Collections;

import org.springframework.security.core.userdetails.User;

public class MyAppUser extends User {

	private static final long serialVersionUID = 1L;

	public MyAppUser(String username) {
		super(username, "", Collections.emptyList());
	}
}
