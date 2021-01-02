package pl.czopor.szt.converters;

import pl.czopor.szt.dto.IngredientDto;
import pl.czopor.szt.models.Ingredient;

public class IngredientConverter {

	public static Ingredient mapFromDto(IngredientDto ingredientDto) {
		return Ingredient.builder()
				.id(ingredientDto.id)
				.name(ingredientDto.name)
				.unit(ingredientDto.unit)
				.build();
	}
	
}
