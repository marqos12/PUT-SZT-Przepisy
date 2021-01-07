package pl.czopor.szt.converters;

import pl.czopor.szt.dto.RecipeIngredientDto;
import pl.czopor.szt.models.Ingredient;
import pl.czopor.szt.models.RecipeIngredient;

public class RecipeIngredientConverter implements Converter<RecipeIngredient, RecipeIngredientDto> {
	
	public RecipeIngredient mapFromDto(RecipeIngredientDto ingredientDto) {
		Ingredient ingredient = Ingredient.builder()
				.name(ingredientDto.name)
				.unit(ingredientDto.unit)
				.build();
		
		return RecipeIngredient.builder()
				.id(ingredientDto.id)
				.ingredient(ingredient)
				.quantity(ingredientDto.quantity)
				.required(ingredientDto.required)
				.build();
	}
	
	public RecipeIngredientDto mapToDto(RecipeIngredient ingredient) {
		return RecipeIngredientDto.builder()
				.id(ingredient.getId())
				.name(ingredient.getIngredient().getName())
				.unit(ingredient.getIngredient().getUnit())
				.quantity(ingredient.getQuantity())
				.required(ingredient.getRequired())
				.build();
	}
	
}
