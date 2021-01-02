package pl.czopor.szt.dto;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

import lombok.Builder;
import pl.czopor.szt.enums.RecipeComplexity;
import pl.czopor.szt.models.User;

@Builder
public class RecipeDto {
	public Long id;
	public User user;
	public String description;
	public String image;
	public String duration;
	public Double mark;
	public List<RecipeIngredientDto> ingredients;
	public List<StepDto> steps;
	public RecipeTypeDto recipeType;
	public Date createdAt;
	public LocalDateTime updatedAt;
	public String name;
	public RecipeComplexity complexity;
	public String portions;

}
