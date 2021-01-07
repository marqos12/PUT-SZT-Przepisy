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
	private RecipeConverter recipeConverter;

	public Recipe createAndSaveRecipe(RecipeDto recipeDto) {
		Recipe recipe = recipeConverter.mapFromDto(recipeDto);

		updateIngredients(recipe);

		Recipe newRecipe = recipeDao.save(recipe);
		return newRecipe;
	}

	private void updateIngredients(Recipe recipe) {
		recipe.setIngredients(recipeIngredientsService.updateRecipeIngredients(recipe.getIngredients()));
	}

}
