package com.todo.security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Component;

@Component
public class JwtAuthenticationProvider implements AuthenticationProvider {
	public static final Logger LOGGER = LoggerFactory.getLogger(JwtAuthenticationProvider.class);

	@Override
	public Authentication authenticate(Authentication a) throws AuthenticationException {
		JwtAuthRequestToken jwtAuthReq = (JwtAuthRequestToken) a;
		String token = jwtAuthReq.getJwtToken();
		MyAppUser user = JwtUtil.parseToken(token);
		return new JwtAuthenticationToken(user, token, user.getAuthorities());
	}

	@Override
	public boolean supports(Class<?> type) {
		boolean retVal = JwtAuthRequestToken.class.isAssignableFrom(type);
		LOGGER.info("in supports with type as {}, retVal= {}", type.getName(), retVal);
		return retVal;
	}
}
