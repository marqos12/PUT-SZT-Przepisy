package pl.czopor.szt.converters;

import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import pl.czopor.szt.dto.RecipeTypeDto;
import pl.czopor.szt.models.RecipeType;

@Service
public class RecipeTypeConverter implements Converter<RecipeType, RecipeTypeDto> {
	
	public RecipeTypeDto mapToDto (RecipeType recipeType) {
		if(Objects.isNull(recipeType)) return null;
		
		List<RecipeTypeDto> children = getChildren(recipeType)
				.stream()
				.map(this::mapToDto)
				.collect(Collectors.toList());
		
		RecipeType parent = recipeType.getParent();
		if(Objects.nonNull(parent))
			parent.setChildren(null);
		
		return RecipeTypeDto
				.builder()
				.id(recipeType.getId())
				.name(recipeType.getName())
				.parent(mapToDto(parent))
				.children(children)
				.build();	
	}
	
	public static List<RecipeType> getChildren(RecipeType recipeType) {
		return Objects.isNull(recipeType.getChildren()) || recipeType.getChildren().isEmpty()
				? Collections.emptyList()
				: recipeType.getChildren();
	}

	public RecipeType mapFromDto(RecipeTypeDto recipeType) {
		if (Objects.isNull(recipeType)) {
			return null;
		}
		
		List<RecipeType> children = getChildren(recipeType)
				.stream()
				.map(this::mapFromDto)
				.collect(Collectors.toList());
				
		return RecipeType.builder()
				.id(recipeType.id)
				.name(recipeType.name)
				.parent(mapFromDto(recipeType.parent))
				.children(children)
				.build();
	}

	public static List<RecipeTypeDto> getChildren(RecipeTypeDto recipeType) {
		return Objects.isNull(recipeType.children) ? Collections.emptyList() : recipeType.children;
	}

}
