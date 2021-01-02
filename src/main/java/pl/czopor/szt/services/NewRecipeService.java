package pl.czopor.szt.services;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import pl.czopor.szt.converters.RecipeConverter;
import pl.czopor.szt.dao.RecipeDao;
import pl.czopor.szt.dto.RecipeDto;
import pl.czopor.szt.models.Recipe;
import pl.czopor.szt.models.RecipeIngredient;
import pl.czopor.szt.models.Step;

@Service
@AllArgsConstructor
public class NewRecipeService {

	private RecipeDao recipeDao;
	private RecipeIngredientsService recipeIngredientsService;
	private StepsService stepsService;

	public Recipe createAndSaveRecipe(RecipeDto recipeDto) {
		RecipeConverter recipeConverter = new RecipeConverter();
		recipeConverter.mapFromDto(recipeDto);

		Recipe newRecipe = recipeDao.save(recipeConverter.recipe);

		updateAndSaveRecipeIngredients(recipeConverter.ingredients, newRecipe);
		updateAndSaveSteps(recipeConverter.steps, newRecipe);
		return newRecipe;
	}

	private void updateAndSaveRecipeIngredients(List<RecipeIngredient> ingredients, Recipe recipe) {
		ingredients.forEach(ingredient -> ingredient.setRecipe(recipe));
		recipeIngredientsService.createAndSaveRecipeIngredients(ingredients);
	}

	private void updateAndSaveSteps(List<Step> steps, Recipe recipe) {
		steps.forEach(step -> step.setRecipe(recipe));
		stepsService.createAndSaveSteps(steps);

	}

}
