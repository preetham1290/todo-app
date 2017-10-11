package com.todo.security;

import java.util.Collections;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;

public class JwtAuthRequestToken extends AbstractAuthenticationToken {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private final String jwtToken;
    
    
	public JwtAuthRequestToken(String jwtToken ) {
        super(Collections.<GrantedAuthority>emptyList());
        this.jwtToken = jwtToken;
    }
    
    //At the time of request for authentication, the client supplies only jwt token
    //the token contains the principal and token itself is a credential
    @Override
    public Object getCredentials() {
        return jwtToken;
    }

    @Override
    public Object getPrincipal() {
        return jwtToken;
    }

    public String getJwtToken() {
        return this.jwtToken;
    }
}
