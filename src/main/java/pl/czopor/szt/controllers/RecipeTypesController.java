package pl.czopor.szt.controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import pl.czopor.szt.converters.RecipeTypeConverter;
import pl.czopor.szt.dao.RecipeTypeDao;
import pl.czopor.szt.dto.RecipeTypeDto;

@RestController
@RequestMapping("/api/recipeTypes")
@AllArgsConstructor
public class RecipeTypesController {
	RecipeTypeDao recipeTypeDao;

	@GetMapping()
	public List<RecipeTypeDto> getRecipeTypes() {
		return recipeTypeDao.findAll().stream().map(RecipeTypeConverter::mapToDto).collect(Collectors.toList());
	}
}
