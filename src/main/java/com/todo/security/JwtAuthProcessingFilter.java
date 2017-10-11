package com.todo.security;

import java.io.IOException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;

public class JwtAuthProcessingFilter extends AbstractAuthenticationProcessingFilter {
	public static final Logger LOGGER = LoggerFactory.getLogger(JwtAuthProcessingFilter.class);

	public JwtAuthProcessingFilter() {
		super("/api/**");
	}

	@Override
	public boolean requiresAuthentication(HttpServletRequest request, HttpServletResponse response) {

		boolean retVal = super.requiresAuthentication(request, response);
		LOGGER.info("\n\n\n JWT NOTE: returning requiresAuthentication for URL {} as {}\n\n\n", request.getRequestURL(),
				retVal);
		return retVal;
		// return true;
	}

	@Override
	public Authentication attemptAuthentication(HttpServletRequest hsr, HttpServletResponse hsr1)
			throws AuthenticationException, IOException, ServletException {
		String authHeader = hsr.getHeader("Authorization");
		if (authHeader == null || !authHeader.startsWith("Bearer ")) {
			LOGGER.error("Missing token in header {}", authHeader);
			throw new JwtAuthenticationException("Missing token in header");
		}
		String tokenStr = authHeader.substring(7).trim();
		if (tokenStr == null || tokenStr.isEmpty()) {
			LOGGER.error("Malformed token {}", tokenStr);
			throw new JwtAuthenticationException("Malformed token");
		}
		JwtAuthRequestToken authRequest = new JwtAuthRequestToken(tokenStr);
		return getAuthenticationManager().authenticate(authRequest);
	}

	@Override
	public void successfulAuthentication(HttpServletRequest req, HttpServletResponse resp, FilterChain chain,
			Authentication authResult) throws IOException, ServletException {
		LOGGER.info("At successfulAuthentication {} with auth class as {}", authResult,
				authResult.getClass().getName());
		super.successfulAuthentication(req, resp, chain, authResult);
		LOGGER.info("Post super.successfulAuthentication");
		chain.doFilter(req, resp);
	}
}
