package pl.czopor.szt.converters;

import java.util.List;
import java.util.stream.Collectors;

import pl.czopor.szt.dto.RecipeDto;
import pl.czopor.szt.models.Recipe;
import pl.czopor.szt.models.RecipeIngredient;
import pl.czopor.szt.models.Step;

public class RecipeConverter {

	public List<RecipeIngredient> ingredients;
	public List<Step> steps;
	public Recipe recipe;
	
	public Recipe mapFromDto(RecipeDto recipeDto) {
		
		ingredients = recipeDto
				.ingredients
				.stream()
				.map(RecipeIngredientConverter::mapFromDto)
				.collect(Collectors.toList());
		
		steps = recipeDto
				.steps
				.stream()
				.map(StepConverter::mapFromDto)
				.collect(Collectors.toList());

		recipe = Recipe.builder()
				.id(recipeDto.id)
				.user(recipeDto.user)
				.description(recipeDto.description)
				.image(recipeDto.image)
				.duration(recipeDto.duration)
				.mark(recipeDto.mark)
				.recipeType(RecipeTypeConverter.mapFromDto(recipeDto.recipeType))
				.createdAt(recipeDto.createdAt)
				.updatedAt(recipeDto.updatedAt)
				.name(recipeDto.name)
				.complexity(recipeDto.complexity)
				.portions(recipeDto.portions)
				.build();
		
		return recipe;
	}
	
	public static RecipeDto mapToDto(Recipe recipe) {
		return RecipeDto.builder()
				.id(recipe.getId())
				.user(recipe.getUser())
				.description(recipe.getDescription())
				.image(recipe.getImage())
				.duration(recipe.getDuration())
				.mark(recipe.getMark())
				.recipeType(RecipeTypeConverter.mapToDto(recipe.getRecipeType()))
				.createdAt(recipe.getCreatedAt())
				.updatedAt(recipe.getUpdatedAt())
				.name(recipe.getName())
				.complexity(recipe.getComplexity())
				.portions(recipe.getPortions())
				.build();
	}	
}