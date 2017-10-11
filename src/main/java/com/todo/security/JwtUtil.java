package com.todo.security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.AuthenticationException;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

public class JwtUtil {

	public static final Logger LOGGER = LoggerFactory.getLogger(JwtUtil.class);

	private static final String secretKey = "our_super_secret_key";

	public static MyAppUser parseToken(String token) throws AuthenticationException {
		try {
			Claims body = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody();
			String userName = (String) body.get("userName");
			MyAppUser user = new MyAppUser(userName);
			return user;
		} catch (JwtException | ClassCastException e) {
			LOGGER.error("Error while parsing user supplied token {}", e.getMessage());
			throw new JwtAuthenticationException("Token parse error...");
		}
	}

	public static String createToken(String userName) throws AuthenticationException {
		if (userName != null) {
			Claims claims = Jwts.claims().setSubject(userName);
			claims.put("userName", userName);
			String jwt = Jwts.builder().setClaims(claims).signWith(SignatureAlgorithm.HS512, secretKey).compact();
			return jwt;
		}
		throw new JwtAuthenticationException("Could not create JWT token...");
	}
}
