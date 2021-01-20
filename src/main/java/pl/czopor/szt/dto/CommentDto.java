package pl.czopor.szt.dto;

import java.time.LocalDateTime;

import lombok.Builder;

@Builder
public class CommentDto {
	public Long id;
	public RecipeDto recipe;
	public UserDto user;
	public LocalDateTime date;
	public String content;
	public Boolean isNew;
	public Boolean isEdited;
}
