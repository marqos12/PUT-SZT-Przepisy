package pl.czopor.szt.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import pl.czopor.szt.dao.IngredientDao;
import pl.czopor.szt.models.Ingredient;

@RestController
@EnableAutoConfiguration
public class RecipesController {
	
	@Autowired
	private IngredientDao ingredientDao;
	
	@PostMapping("/test")
	public void test() {
		System.out.println("test działa");
		Ingredient ingredient = new Ingredient();
		ingredient.setName("test");
		ingredientDao.save(ingredient);
		
	}

}
