package pl.czopor.szt.converters;

import java.util.List;
import java.util.stream.Collectors;

import lombok.RequiredArgsConstructor;
import pl.czopor.szt.dto.RecipeDto;
import pl.czopor.szt.dto.RecipeIngredientDto;
import pl.czopor.szt.dto.RecipeTypeDto;
import pl.czopor.szt.dto.StepDto;
import pl.czopor.szt.models.Recipe;
import pl.czopor.szt.models.RecipeIngredient;
import pl.czopor.szt.models.Step;

@RequiredArgsConstructor
public class RecipeConverter implements Converter<Recipe, RecipeDto> {

	public final StepConverter stepConverter;
	public final RecipeTypeConverter recipeTypeConverter;
	public final RecipeIngredientConverter recipeIngredientConverter;

	public Recipe mapFromDto(RecipeDto recipeDto) {

		List<RecipeIngredient> ingredients = recipeDto.ingredients.stream().map(recipeIngredientConverter::mapFromDto)
				.collect(Collectors.toList());

		List<Step> steps = recipeDto.steps.stream().map(stepConverter::mapFromDto).collect(Collectors.toList());

		Recipe recipe = Recipe.builder().id(recipeDto.id).user(recipeDto.user).description(recipeDto.description)
				.image(recipeDto.image).duration(recipeDto.duration).mark(recipeDto.mark)
				.recipeType(recipeTypeConverter.mapFromDto(recipeDto.recipeType)).createdAt(recipeDto.createdAt)
				.updatedAt(recipeDto.updatedAt).name(recipeDto.name).complexity(recipeDto.complexity)
				.portions(recipeDto.portions).ingredients(ingredients).steps(steps)
				.shortDescription(recipeDto.shortDescription).build();

		return recipe;
	}

	public RecipeDto simpleMapToDto(Recipe recipe) {
		RecipeTypeDto recipeType = recipeTypeConverter.mapToDto(recipe.getRecipeType());
		recipeType.children = null;
		return RecipeDto.builder().id(recipe.getId()).user(recipe.getUser()).description(recipe.getDescription())
				.image(recipe.getImage()).duration(recipe.getDuration()).mark(recipe.getMark()).recipeType(recipeType)
				.createdAt(recipe.getCreatedAt()).updatedAt(recipe.getUpdatedAt()).name(recipe.getName())
				.complexity(recipe.getComplexity()).portions(recipe.getPortions())
				.shortDescription(recipe.getShortDescription()).build();
	}

	public RecipeDto mapToDto(Recipe recipe) {
		RecipeDto recipeDto = simpleMapToDto(recipe);
		recipeDto.ingredients = getIngredientsForRecipe(recipe);
		recipeDto.steps = getStepsForRecipe(recipe);
		return recipeDto;
	}

	public List<RecipeDto> mapRecipesToRecipeDtos(List<Recipe> recipes) {
		return recipes.stream().map(this::mapToDto).collect(Collectors.toList());
	}

	private List<RecipeIngredientDto> getIngredientsForRecipe(Recipe recipe) {
		List<RecipeIngredient> ingredients = recipe.getIngredients();
		return ingredients.stream().map(recipeIngredientConverter::mapToDto).collect(Collectors.toList());
	}

	private List<StepDto> getStepsForRecipe(Recipe recipe) {
		List<Step> steps = recipe.getSteps();
		return steps.stream().map(stepConverter::mapToDto).collect(Collectors.toList());
	}

}