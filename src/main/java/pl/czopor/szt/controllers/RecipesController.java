package pl.czopor.szt.controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pl.czopor.szt.dao.RecipeTypeDao;
import pl.czopor.szt.dto.RecipeTypeDto;
import pl.czopor.szt.models.RecipeType;

@RestController
@EnableAutoConfiguration
@RequestMapping("/api/recipe")
public class RecipesController {

	@Autowired
	private RecipeTypeDao recipeTypeDao;

	@PostMapping("/test")
	public void test() {

		RecipeType r1 = new RecipeType();
		r1.setName("Dania obiadowe");
		r1.setIsRoot(true);
		recipeTypeDao.save(r1);

		RecipeType r2 = new RecipeType();
		r2.setName("Jednogarnkowe");
		r2.setParent(r1);
		recipeTypeDao.save(r2);

		RecipeType r4 = new RecipeType();
		r4.setName("Pizza");
		r4.setParent(r2);
		recipeTypeDao.save(r4);

		RecipeType r3 = new RecipeType();
		r3.setName("Makarony");
		r3.setParent(r2);
		recipeTypeDao.save(r3);

	}

	@GetMapping("/test")
	public List<RecipeTypeDto> test2() {
		List<RecipeType> zwrotka = recipeTypeDao.findByIsRootNotNull();

		return zwrotka.stream().map(RecipeTypeDto::mapToDto).collect(Collectors.toList());
	}

}
