package pl.czopor.szt.controllers;

import java.util.List;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import pl.czopor.szt.dao.RecipeDao;
import pl.czopor.szt.dto.RecipeDto;
import pl.czopor.szt.dto.RecipeFilters;
import pl.czopor.szt.enums.RecipeComplexity;
import pl.czopor.szt.models.Recipe;
import pl.czopor.szt.services.NewRecipeService;
import pl.czopor.szt.services.RecipeService;

@RestController
@AllArgsConstructor
@EnableAutoConfiguration
@RequestMapping("/api/recipe")
public class RecipesController {

	NewRecipeService newRecipeService;
	RecipeService recipeService;
	RecipeDao recipeDao;

	@PostMapping()
	public RecipeDto createNewRecipe(@RequestBody RecipeDto recipe) {
		Recipe savedRecipe = newRecipeService.createAndSaveRecipe(recipe);
		return recipeService.mapRecipeToRecipeDto(savedRecipe);
	}

	@GetMapping()
	public List<RecipeDto> getRecipes(@RequestParam(required = false) String name,
			@RequestParam(required = false) Long durationFrom, @RequestParam(required = false) Long durationTo,
			@RequestParam(required = false) List<RecipeComplexity> complexity,
			@RequestParam(required = false) List<Long> ingredients, @RequestParam(required = false) List<Long> type) {

		RecipeFilters recipeFilters = RecipeFilters.builder().complexity(complexity).durationFrom(durationFrom)
				.durationTo(durationTo).ingredients(ingredients).name(name).type(type).build();

		return recipeService.getRecipeByFilters(recipeFilters);
	}

}
