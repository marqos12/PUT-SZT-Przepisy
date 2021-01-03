package pl.czopor.szt.services;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import pl.czopor.szt.converters.RecipeConverter;
import pl.czopor.szt.dao.RecipeDao;
import pl.czopor.szt.dto.RecipeDto;
import pl.czopor.szt.models.Recipe;

@Service
@AllArgsConstructor
public class NewRecipeService {

	private RecipeDao recipeDao;
	private RecipeIngredientsService recipeIngredientsService;

	public Recipe createAndSaveRecipe(RecipeDto recipeDto) {
		RecipeConverter recipeConverter = new RecipeConverter();
		Recipe recipe = recipeConverter.mapFromDto(recipeDto);

		updateIngredients(recipe);

		Recipe newRecipe = recipeDao.save(recipeConverter.recipe);
		return newRecipe;
	}

	private void updateIngredients(Recipe recipe) {
		recipe.setIngredients(recipeIngredientsService.updateRecipeIngredients(recipe.getIngredients()));
	}

}
