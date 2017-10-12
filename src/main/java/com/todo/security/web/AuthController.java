package com.todo.security.web;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

	public static final Logger logger = LoggerFactory.getLogger(AuthController.class);

	private static Map<String, String> passwds;

	static {
		passwds = new HashMap<>();
		passwds.put("user", "user");
		passwds.put("user2", "user2");
	}

	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public Map<String, String> login(@RequestBody HashMap<String, String> cred) {
		Map<String, String> token = new HashMap<>();
		String userName = cred.get("userName");
		String passwd = cred.get("password");
		if (verifyPasswd(userName, passwd)) {
			String jToken = UUID.randomUUID().toString();
			token.put("token", jToken);
			return token;
		}
		return null;
	}

	private boolean verifyPasswd(String userName, String passwd) {
		String storedPasswd = passwds.get(userName);
		return (storedPasswd != null && storedPasswd.equals(passwd));
	}
}
