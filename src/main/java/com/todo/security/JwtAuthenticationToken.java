package com.todo.security;

import java.util.Collection;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;

public class JwtAuthenticationToken extends UsernamePasswordAuthenticationToken {

	private static final long serialVersionUID = 1L;

	public JwtAuthenticationToken(Object principal, Object credentials, Collection<GrantedAuthority> authorities) {
		super(principal, credentials, authorities);
	}
}
