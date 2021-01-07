package pl.czopor.szt.converters;

import pl.czopor.szt.dto.IngredientDto;
import pl.czopor.szt.models.Ingredient;

public class IngredientConverter implements Converter<Ingredient, IngredientDto> {

	public Ingredient mapFromDto(IngredientDto ingredientDto) {
		return Ingredient.builder()
				.id(ingredientDto.id)
				.name(ingredientDto.name)
				.unit(ingredientDto.unit)
				.build();
	}

	@Override
	public IngredientDto mapToDto(Ingredient ingredient) {
		return IngredientDto.builder()
				.id(ingredient.getId())
				.name(ingredient.getName())
				.unit(ingredient.getUnit())
				.build();
	}
	
}
