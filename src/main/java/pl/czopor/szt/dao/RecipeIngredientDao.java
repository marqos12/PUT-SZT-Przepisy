package pl.czopor.szt.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import pl.czopor.szt.models.RecipeIngredient;

@Repository
public interface RecipeIngredientDao extends JpaRepository<RecipeIngredient, Long>{

}
