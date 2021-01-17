package pl.czopor.szt.converters;

import java.util.Objects;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import pl.czopor.szt.dao.UserDao;
import pl.czopor.szt.dto.UserDto;
import pl.czopor.szt.models.User;

@AllArgsConstructor
@Service
public class UserConverter implements Converter<User, UserDto> {
	public final UserDao userDao;

	@Override
	public User mapFromDto(UserDto userDto) {
		return userDao.findByUsername(userDto.username).orElse(null);
	}

	@Override
	public UserDto mapToDto(User user) {
		UserDto userDto = null;
		if (Objects.nonNull(user))
			userDto = UserDto.builder().id(user.getId()).username(user.getUsername()).build();
		return userDto;
	}

}
