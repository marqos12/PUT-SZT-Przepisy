package pl.czopor.szt.dto;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Arrays;

import org.junit.jupiter.api.Test;

import pl.czopor.szt.models.RecipeType;

public class RecipeTypeConversionsTest {

	@Test
	public void recipeTypeDtoToEntityConversionTest() {
		
	}

	@Test
	public void recipeTypeEntityToDtoConversionTest() {
		RecipeType r1 = new RecipeType();
		r1.setName("Dania obiadowe");
		r1.setIsRoot(true);

		RecipeType r2 = new RecipeType();
		r2.setName("Jednogarnkowe");
		r2.setParent(r1);
		r1.setChildren(Arrays.asList(r2));

		RecipeType r4 = new RecipeType();
		r4.setName("Pizza");
		r4.setParent(r2);
		
		RecipeType r3 = new RecipeType();
		r3.setName("Makarony");
		r3.setParent(r2);
		r2.setChildren(Arrays.asList(r3,r4));
		
		RecipeTypeDto dto = RecipeTypeDto.mapToDto(r1);
		
		assertThat(dto.children).isNotEmpty();
		assertThat(dto.children.get(0).children).isNotEmpty();
		assertThat(dto.children.get(0).children.size()).isEqualTo(2);
		assertThat(dto.children.get(0).children.get(0).children).isEmpty();
		
		assertThat(dto.name).isEqualTo(r1.getName());
		assertThat(dto.children.get(0).name).isEqualTo(r2.getName());
		
		
	}
}
