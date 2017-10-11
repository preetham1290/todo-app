package com.todo.security;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

public class JwtAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

	@Override
	public void onAuthenticationSuccess(HttpServletRequest hsr, HttpServletResponse hsr1, Authentication a)
			throws IOException, ServletException {
		// We do not need to do anything extra on REST authentication success,
		// because there is no page to redirect to
	}

}
