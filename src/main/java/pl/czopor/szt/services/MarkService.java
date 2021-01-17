package pl.czopor.szt.services;

import java.util.List;
import java.util.Objects;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import pl.czopor.szt.converters.RecipeConverter;
import pl.czopor.szt.dao.MarkDao;
import pl.czopor.szt.dao.RecipeDao;
import pl.czopor.szt.dto.RecipeDto;
import pl.czopor.szt.models.Mark;
import pl.czopor.szt.models.Recipe;
import pl.czopor.szt.models.User;

@Service
@AllArgsConstructor
public class MarkService {
	MarkDao markDao;
	RecipeDao recipeDao;
	RecipeConverter recipeConverter;
	UserService userService;

	public RecipeDto changeMark(Recipe recipe, int value) {
		User user = userService.getActiveUser();
		if (Objects.isNull(user))
			return null;
		
		recipe = recipeDao.getOne(recipe.getId());

		Mark mark = null;
		mark = markDao.findByUserAndRecipe(user, recipe);

		if (Objects.isNull(mark)) {
			mark = Mark.builder().recipe(recipe).user(user).build();
		}
		mark.setValue(value);
		markDao.save(mark);
		
		List<Mark> recipeMarks = markDao.findByRecipe(recipe);
		Double meanMark = recipeMarks.stream().mapToInt(Mark::getValue).average().orElse(0.0);
		recipe.setMark(meanMark);
		recipeDao.save(recipe);
		return recipeConverter.mapToDto(recipe);
	}
	
	public Mark getUserMarkForRecipe( Recipe recipe) {
		User user = userService.getActiveUser();
		if (Objects.isNull(user))
			return null;

		return markDao.findByUserAndRecipe(user, recipe);
	}

}
