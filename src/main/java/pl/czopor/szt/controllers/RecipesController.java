package pl.czopor.szt.controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import pl.czopor.szt.dao.RecipeDao;
import pl.czopor.szt.dto.RecipeDto;
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
	public List<RecipeDto> getAllRecipes() {
		return recipeDao.findAll().stream().map(recipeService::mapRecipeToRecipeDto).collect(Collectors.toList());
	}

}
