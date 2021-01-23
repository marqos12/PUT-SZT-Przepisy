package pl.czopor.szt.controllers;

import java.util.List;

import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import pl.czopor.szt.dto.RecipeTypeDto;
import pl.czopor.szt.services.RecipeTypeService;

@RestController
@RequestMapping("/api/recipeTypes")
@AllArgsConstructor
public class RecipeTypesController {
	RecipeTypeService recipeTypeService;

	@GetMapping()
	public List<RecipeTypeDto> getRecipeTypes() {
		return recipeTypeService.getRecipesByRoot();
	}

	@PostMapping()
	@Secured("ROLE_USER")
	public RecipeTypeDto saveRecipeType(@RequestBody RecipeTypeDto recipeType) {
		return recipeTypeService.saveRecipeType(recipeType);
	}
}
