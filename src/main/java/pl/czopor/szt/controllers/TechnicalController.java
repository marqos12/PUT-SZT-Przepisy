package pl.czopor.szt.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import pl.czopor.szt.dao.IngredientDao;
import pl.czopor.szt.models.Ingredient;

@Controller
@RequestMapping("/api/technical")
public class TechnicalController {

	@Autowired
	IngredientDao ingredientDao;

	@GetMapping("/init/ingredients")
	public void test() {
		Ingredient i4 = new Ingredient();
		i4.setName("Kurczak");
		i4.setUnit("kg");
		ingredientDao.save(i4);
		Ingredient i3 = new Ingredient();
		i3.setName("Mąka");
		i3.setUnit("g");
		ingredientDao.save(i3);
		Ingredient i2 = new Ingredient();
		i2.setName("Cukier");
		i2.setUnit("g");
		ingredientDao.save(i2);
		Ingredient i1 = new Ingredient();
		i1.setName("Woda");
		i1.setUnit("ml");
		ingredientDao.save(i1);
	}
}
