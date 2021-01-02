package pl.czopor.szt.converters;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;

import pl.czopor.szt.dto.IngredientDto;
import pl.czopor.szt.models.Ingredient;

public class IngredientConverterTest {

	@Test
	public void ingredientToIngredientDtoConversionTest() {
		IngredientDto ingredientDto = IngredientDto.builder()
				.id(1L)
				.name("Chicken")
				.unit("g")
				.build();
		Ingredient ingredient = IngredientConverter.mapFromDto(ingredientDto);
		
		assertThat(ingredient.getId()).isEqualTo(ingredientDto.id);
		assertThat(ingredient.getName()).isEqualTo(ingredientDto.name);
		assertThat(ingredient.getUnit()).isEqualTo(ingredientDto.unit);
	}
}
