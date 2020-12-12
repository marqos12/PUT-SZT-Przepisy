package pl.czopor.szt.dto;

import java.time.LocalDateTime;

import pl.czopor.szt.models.Recipe;
import pl.czopor.szt.models.User;

public class ActivityDto {
	public Long id;
	public Recipe recipe;
	public User user;
	public LocalDateTime date;
}
