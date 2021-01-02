package pl.czopor.szt.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import pl.czopor.szt.converters.RecipeConverter;
import pl.czopor.szt.converters.RecipeIngredientConverter;
import pl.czopor.szt.converters.StepConverter;
import pl.czopor.szt.dao.RecipeIngredientDao;
import pl.czopor.szt.dao.StepDao;
import pl.czopor.szt.dto.RecipeDto;
import pl.czopor.szt.dto.RecipeIngredientDto;
import pl.czopor.szt.dto.StepDto;
import pl.czopor.szt.models.Recipe;
import pl.czopor.szt.models.RecipeIngredient;
import pl.czopor.szt.models.Step;

@Service
@AllArgsConstructor
public class RecipeService {

	private RecipeIngredientDao recipeIngredientDao;
	private StepDao stepDao;

	public RecipeDto mapRecipeToRecipeDto(Recipe recipe) {
		RecipeDto recipeDto = RecipeConverter.mapToDto(recipe);
		recipeDto.ingredients = getIngredientsForRecipe(recipe);
		recipeDto.steps = getStepsForRecipe(recipe);
		return recipeDto;
	}

	private List<RecipeIngredientDto> getIngredientsForRecipe(Recipe recipe) {
		List<RecipeIngredient> ingredients = recipeIngredientDao.findByRecipe(recipe);
		return ingredients.stream().map(RecipeIngredientConverter::mapToDto).collect(Collectors.toList());
	}

	private List<StepDto> getStepsForRecipe(Recipe recipe) {
		List<Step> steps = stepDao.findByRecipe(recipe);
		return steps.stream().map(StepConverter::mapToDto).collect(Collectors.toList());
	}
}
