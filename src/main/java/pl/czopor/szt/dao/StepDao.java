package pl.czopor.szt.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import pl.czopor.szt.models.Recipe;
import pl.czopor.szt.models.Step;

@Repository
public interface StepDao extends JpaRepository<Step, Long> {
	public List<Step> findByRecipe(Recipe recipe);

}
