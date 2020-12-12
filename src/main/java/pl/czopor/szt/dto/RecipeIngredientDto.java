package pl.czopor.szt.dto;

import pl.czopor.szt.models.Ingredient;
import pl.czopor.szt.models.Recipe;

public class RecipeIngredientDto {
	public Long id;
	public Recipe recipe;
	public Ingredient ingredient;
	public Double quantity;
	public Boolean optional;
}
