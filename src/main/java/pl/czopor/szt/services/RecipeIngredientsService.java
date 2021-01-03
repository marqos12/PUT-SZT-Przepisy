package pl.czopor.szt.services;

import java.util.List;
import java.util.function.Consumer;
import java.util.function.Predicate;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import pl.czopor.szt.dao.IngredientDao;
import pl.czopor.szt.models.Ingredient;
import pl.czopor.szt.models.RecipeIngredient;

@Service
@AllArgsConstructor
public class RecipeIngredientsService {

	private IngredientDao ingredientDao;

	public List<RecipeIngredient> updateRecipeIngredients(List<RecipeIngredient> recipeIngredients) {
		List<Ingredient> ingredients = recipeIngredients.stream().map(RecipeIngredient::getIngredient)
				.collect(Collectors.toList());
		createAndSaveNewIngredients(ingredients);

		List<Ingredient> allIngredients = ingredientDao.findAll();

		recipeIngredients.stream().forEach(updateIngredient(allIngredients));
		return recipeIngredients;
	}

	private void createAndSaveNewIngredients(List<Ingredient> ingredients) {
		List<Ingredient> allIngredients = ingredientDao.findAll();
		List<Ingredient> newIngredients = ingredients.stream().filter(ingredientExists(allIngredients).negate())
				.collect(Collectors.toList());

		ingredientDao.saveAll(newIngredients);
	}

	private Predicate<Ingredient> ingredientExists(List<Ingredient> allIngredients) {
		return ingredient -> allIngredients.stream().anyMatch(areIngredientsTheSame(ingredient));
	}

	private Predicate<Ingredient> areIngredientsTheSame(Ingredient ingredient) {
		return i -> i.getName().toLowerCase().equals(ingredient.getName().toLowerCase())
				&& i.getUnit().toLowerCase().equals(ingredient.getUnit().toLowerCase());
	}

	private Consumer<RecipeIngredient> updateIngredient(List<Ingredient> allIngredients) {
		return recipeIngredient -> {
			Ingredient ingredient = allIngredients.stream()
					.filter(areIngredientsTheSame(recipeIngredient.getIngredient())).findFirst().orElse(null);
			recipeIngredient.setIngredient(ingredient);
		};
	}
}
