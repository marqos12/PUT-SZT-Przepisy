package pl.czopor.szt.controllers;

import java.security.Principal;
import java.util.List;
import java.util.Objects;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import pl.czopor.szt.converters.RecipeConverter;
import pl.czopor.szt.dao.RecipeDao;
import pl.czopor.szt.dto.ActivityDto;
import pl.czopor.szt.dto.RecipeDto;
import pl.czopor.szt.dto.RecipeFilters;
import pl.czopor.szt.dto.UserDto;
import pl.czopor.szt.enums.RecipeComplexity;
import pl.czopor.szt.models.Recipe;
import pl.czopor.szt.services.ActivityService;
import pl.czopor.szt.services.MarkService;
import pl.czopor.szt.services.NewRecipeService;
import pl.czopor.szt.services.RecipeService;

@RestController
@AllArgsConstructor
@EnableAutoConfiguration
@RequestMapping("/api/recipe")
public class RecipesController {

	NewRecipeService newRecipeService;
	RecipeService recipeService;
	RecipeConverter recipeConverter;
	RecipeDao recipeDao;
	ActivityService activityService;
	MarkService markService;

	@PostMapping()
	@Secured("ROLE_USER")
	public RecipeDto createNewRecipe(@RequestBody RecipeDto recipe, Principal principal) {
		recipe.user = UserDto.builder().username(principal.getName()).build();
		Recipe savedRecipe = newRecipeService.createAndSaveRecipe(recipe);
		return recipeService.mapRecipeToRecipeDto(savedRecipe);
	}

	@GetMapping()
	public Page<RecipeDto> getRecipes(@RequestParam(required = false) String name,
			@RequestParam(required = false) Long durationFrom, @RequestParam(required = false) Long durationTo,
			@RequestParam(required = false) List<RecipeComplexity> complexity,
			@RequestParam(required = false) List<Long> ingredients, @RequestParam(required = false) List<Long> type,
			@RequestParam(required = false) Boolean wantsToCook,
			@RequestParam(required = false, defaultValue = "0") int pageNo,
			@RequestParam(required = false, defaultValue = "10") int pageSize,
			@RequestParam(required = false, defaultValue = "id") String sortBy,
			@RequestParam(required = false, defaultValue = "desc") String sortDirection, Principal principal) {
		String username = Objects.isNull(principal) ? null : principal.getName();

		RecipeFilters recipeFilters = RecipeFilters.builder().complexity(complexity).durationFrom(durationFrom)
				.wantsToCook(wantsToCook).durationTo(durationTo).ingredients(ingredients).name(name).type(type)
				.username(username).build();

		Sort sort = Sort.by(sortBy);
		if (sortDirection.equals("desc"))
			sort = sort.descending();
		else
			sort = sort.ascending();

		Pageable pageable = PageRequest.of(pageNo, pageSize, sort);

		return recipeService.getRecipeByFilters(recipeFilters, pageable);
	}

	@GetMapping("/{id}")
	public RecipeDto getRecipeById(@PathVariable long id) {
		return recipeService.getRecipeById(id);
	}

	@PostMapping("/addToWishlist")
	@Secured("ROLE_USER")
	public ActivityDto addToWishlist(@RequestBody RecipeDto recipeDto, Principal principal) {
		Recipe recipe = recipeConverter.mapFromDto(recipeDto);
		return activityService.changeWishlist(recipe, principal.getName(), true);
	}

	@PostMapping("/removeFromWishlist")
	@Secured("ROLE_USER")
	public ActivityDto removeFromWishlist(@RequestBody RecipeDto recipeDto, Principal principal) {
		Recipe recipe = recipeConverter.mapFromDto(recipeDto);
		return activityService.changeWishlist(recipe, principal.getName(), false);
	}

	@PostMapping("/changeMark")
	@Secured("ROLE_USER")
	public RecipeDto changeMark(@RequestBody RecipeDto recipeDto) {
		int mark = recipeDto.userMark.intValue();
		Recipe recipe = recipeConverter.mapFromDto(recipeDto);
		markService.changeMark(recipe, mark);

		return recipeConverter.mapToDto(recipe);
	}

}
