package pl.czopor.szt.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pl.czopor.szt.dao.IngredientDao;
import pl.czopor.szt.models.Ingredient;

@RestController
@RequestMapping("/api/ingredients")
public class IngredientsController {
	@Autowired
	IngredientDao ingredientDao;

	@GetMapping()
	public List<Ingredient> getIngredients() {
		return ingredientDao.findAll();
	}
}
