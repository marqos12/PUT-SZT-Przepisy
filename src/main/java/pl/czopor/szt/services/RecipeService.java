package pl.czopor.szt.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
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

	public Page<RecipeDto> getRecipeByFilters(RecipeFilters filters, Pageable pageable) {
		RecipeSpecification spec = new RecipeSpecification(filters);

		Page<Recipe> recipes = recipeDao.findAll(spec, pageable);
		Page<RecipeDto> recipesDto = new PageImpl<RecipeDto>(
				recipeConverter.mapRecipesToRecipeDtos(recipes.getContent()), pageable, recipes.getTotalElements());
		return recipesDto;
	}

	public RecipeDto getRecipeById(Long recipeId) {
		Recipe recipe = recipeDao.getOne(recipeId);
		return recipeConverter.mapToDto(recipe);
	}

}
