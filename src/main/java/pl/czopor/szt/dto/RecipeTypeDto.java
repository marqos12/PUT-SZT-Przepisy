package pl.czopor.szt.dto;

import java.util.List;

import lombok.Builder;
import pl.czopor.szt.models.RecipeType;

@Builder
public class RecipeTypeDto {
	public Long id;
	public String name;
	public RecipeTypeDto parent;
	public List<RecipeTypeDto> children;
	
	public static RecipeTypeDto mapToDto (RecipeType recipeType) {
		return RecipeTypeDto
					.builder()
					.id(recipeType.getId())
					.name(recipeType.getName())
					.children(recipeType.getChildrenAsDto())
					.build();	
	} 
}
