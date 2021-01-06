package pl.czopor.szt.config;

import static org.springframework.util.StringUtils.isEmpty;

import java.io.IOException;
import java.util.Collections;
import java.util.Objects;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import lombok.AllArgsConstructor;
import pl.czopor.szt.dao.UserDao;

@Component
@AllArgsConstructor
public class JwtTokenFilter extends OncePerRequestFilter {

	private final JwtTokenUtil jwtTokenUtil;
	private final UserDao userDao;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
			throws ServletException, IOException {

		Cookie[] cookies = request.getCookies();
		Cookie authCookie = null;
		if (Objects.nonNull(cookies)) {
			for (Cookie cookie : cookies) {
				if (cookie.getName().equals("Authorization")) {
					authCookie = cookie;
				}
			}
		}
		final String header = request.getHeader(HttpHeaders.AUTHORIZATION);

		boolean hasAuthHeader = !isEmpty(header) && header.startsWith("Bearer ");
		boolean hasAuthCookie = Objects.nonNull(authCookie);

		if (!hasAuthHeader && !hasAuthCookie) {
			chain.doFilter(request, response);
			return;
		}

		String token = "";
		if (hasAuthHeader) {
			token = header.split(" ")[1].trim();
			if (!jwtTokenUtil.validate(token)) {
				chain.doFilter(request, response);
				return;
			}
		}
		if (hasAuthCookie) {
			token = authCookie.getValue().trim();
			if (!jwtTokenUtil.validate(token)) {
				chain.doFilter(request, response);
				return;
			}
		}

		UserDetails userDetails = userDao.findByUsername(jwtTokenUtil.getUsername(token)).orElse(null);

		UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, null,
				userDetails == null ? Collections.emptyList() : userDetails.getAuthorities());

		authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

		SecurityContextHolder.getContext().setAuthentication(authentication);
		chain.doFilter(request, response);
	}

}
