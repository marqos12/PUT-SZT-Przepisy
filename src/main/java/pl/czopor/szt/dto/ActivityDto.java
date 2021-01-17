package pl.czopor.szt.dto;

import java.time.LocalDateTime;

import lombok.Builder;

@Builder
public class ActivityDto {
	public Long id;
	public RecipeDto recipe;
	public UserDto user;
	public LocalDateTime date;
	public Boolean wantToCook;
}
