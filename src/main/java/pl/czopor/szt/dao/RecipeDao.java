package pl.czopor.szt.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import pl.czopor.szt.models.Recipe;

@Repository
public interface RecipeDao extends JpaRepository<Recipe, Long>, JpaSpecificationExecutor<Recipe> {

}
