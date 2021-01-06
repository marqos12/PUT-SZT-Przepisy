package pl.czopor.szt.services;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.xml.bind.ValidationException;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import pl.czopor.szt.config.JwtTokenUtil;
import pl.czopor.szt.dao.UserDao;
import pl.czopor.szt.dto.AuthRequest;
import pl.czopor.szt.dto.RegisterRequest;
import pl.czopor.szt.enums.Role;
import pl.czopor.szt.models.User;

@AllArgsConstructor
@Service
public class UserService {
	private UserDao userDao;
	private PasswordEncoder passwordEncoder;
	private JwtTokenUtil jwtTokenUtil;
	private AuthenticationManager authenticationManager;

	public User create(RegisterRequest request) throws ValidationException {
		if (userDao.findByUsername(request.username).isPresent()) {
			throw new ValidationException("Nazwa użytkownika jest już zajęta!");
		}
		if (!request.password.equals(request.passwordConfirmation)) {
			throw new ValidationException("Hasła muszą się zgadzać!");
		}

		User user = User.builder()
				.accountNonExpired(true)
				.accountNonLocked(true)
				.credentialsNonExpired(true)
				.enabled(true)
				.authority(Role.ROLE_USER)
				.password(passwordEncoder.encode(request.password))
				.username(request.username)
				.build();

		User newUser = userDao.save(user);
		return newUser;
	}
	
	public User login(AuthRequest request, HttpServletResponse response) throws ValidationException {
		Authentication authenticate = null;
		try {
			authenticate = authenticationManager
					.authenticate(new UsernamePasswordAuthenticationToken(request.username, request.password));
		} catch (Exception e) {
			throw new ValidationException("Błędne dane logowania!");
		}
		
		User user = (User) authenticate.getPrincipal();

		Cookie cookie = new Cookie("Authorization", jwtTokenUtil.generateAccessToken(user));
		cookie.setMaxAge(7 * 24 * 60 * 60);
		cookie.setHttpOnly(true);
		cookie.setPath("/");
		response.addCookie(cookie);
		
		return user;
	}
}
