package pl.czopor.szt.controllers;

import java.security.Principal;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.xml.bind.ValidationException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import pl.czopor.szt.dto.AuthRequest;
import pl.czopor.szt.dto.RegisterRequest;
import pl.czopor.szt.models.User;
import pl.czopor.szt.services.UserService;

@RestController
@RequestMapping(path = "api/auth")
@AllArgsConstructor
public class AuthController {

	private UserService userService;

	@PostMapping("login")
	public ResponseEntity<Object> login(@RequestBody AuthRequest request, HttpServletResponse response) {
		try {
			User user = userService.login(request, response);
			return ResponseEntity.ok(user);
		} catch (Exception exception) {
			return new ResponseEntity<Object>(exception.getMessage(), HttpStatus.UNAUTHORIZED);
		}
	}

	@PostMapping("register")
	public ResponseEntity<Object> register(@RequestBody RegisterRequest request) {
		try {
			User createdUser = userService.create(request);
			return ResponseEntity.ok(createdUser);
		} catch (ValidationException exception) {
			return new ResponseEntity<Object>(exception.getMessage(), HttpStatus.CONFLICT);
		}

	}

	@GetMapping("whoami")
	public Principal whoAmI(Principal principal) {
		return principal;
	}

	@PostMapping("logout")
	public ResponseEntity<Object> logout(HttpServletResponse response) {
		Cookie cookie = new Cookie("Authorization", "");
		cookie.setMaxAge(0);
		cookie.setHttpOnly(true);
		cookie.setPath("/");
		response.addCookie(cookie);
		return new ResponseEntity<Object>("{\"message\":\"Wylogowano!\"}", HttpStatus.OK);
	}

}