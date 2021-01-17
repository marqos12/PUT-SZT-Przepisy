package pl.czopor.szt.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import pl.czopor.szt.models.Mark;
import pl.czopor.szt.models.Recipe;
import pl.czopor.szt.models.User;

@Repository
public interface MarkDao extends JpaRepository<Mark, Long> {
	Mark findByUserAndRecipe(User user, Recipe recipe);
	List<Mark> findByRecipe(Recipe recipe);
}