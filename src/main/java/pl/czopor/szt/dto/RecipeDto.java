package pl.czopor.szt.dto;

import java.time.LocalDateTime;

import pl.czopor.szt.models.User;

public class RecipeDto {
	public Long id;
	public User user;
	public String description;
	public String image;
	public String duration;
	public Double mark;
	public LocalDateTime data;
}
