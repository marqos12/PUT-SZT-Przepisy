package pl.czopor.szt.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import pl.czopor.szt.models.Recipe;
import pl.czopor.szt.models.RecipeIngredient;

@Repository
public interface RecipeIngredientDao extends JpaRepository<RecipeIngredient, Long> {
	public List<RecipeIngredient> findByRecipe(Recipe recipe);
}
