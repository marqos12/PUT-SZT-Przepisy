package pl.czopor.szt.dto;

import lombok.Builder;

@Builder
public class RecipeIngredientDto {
	public Long id;
	public Double quantity;
	public Boolean required;
	public String name;
	public String unit;
}
