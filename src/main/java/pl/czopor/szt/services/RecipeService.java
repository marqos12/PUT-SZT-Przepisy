package pl.czopor.szt.services;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import pl.czopor.szt.converters.RecipeConverter;
import pl.czopor.szt.dao.RecipeDao;
import pl.czopor.szt.dao.specifications.RecipeSpecification;
import pl.czopor.szt.dto.RecipeDto;
import pl.czopor.szt.dto.RecipeFilters;
import pl.czopor.szt.models.Recipe;

@Service
@AllArgsConstructor
public class RecipeService {

	private RecipeConverter recipeConverter;
	private RecipeDao recipeDao;

	public RecipeDto mapRecipeToRecipeDto(Recipe recipe) {
		return recipeConverter.mapToDto(recipe);
	}

	public List<RecipeDto> getRecipeByFilters(RecipeFilters filters) {
		RecipeSpecification spec = new RecipeSpecification(filters);
		List<Recipe> recipes = recipeDao.findAll(spec);
		return recipeConverter.mapRecipesToRecipeDtos(recipes);
	}

}
