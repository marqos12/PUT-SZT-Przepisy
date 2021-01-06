package pl.czopor.szt.dto;

import java.util.List;

import pl.czopor.szt.enums.Role;

public class UserDto {
	public Long id;
	public String username;
	public String password;
	public List<Role> authorities;
}
