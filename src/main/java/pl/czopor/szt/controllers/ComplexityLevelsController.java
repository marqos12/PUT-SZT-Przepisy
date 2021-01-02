package pl.czopor.szt.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pl.czopor.szt.enums.RecipeComplexity;

@RestController
@RequestMapping("/api/complexityLevels")
public class ComplexityLevelsController {

	@GetMapping()
	public RecipeComplexity[] getComplexityLevels() {
		return RecipeComplexity.values();
	}
}
