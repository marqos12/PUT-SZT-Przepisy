package pl.czopor.szt.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import pl.czopor.szt.models.Ingredient;

@Repository
public interface IngredientDao extends JpaRepository<Ingredient, Long>{

}
