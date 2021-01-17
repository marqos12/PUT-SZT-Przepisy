package pl.czopor.szt.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import pl.czopor.szt.models.Activity;
import pl.czopor.szt.models.Recipe;
import pl.czopor.szt.models.User;

@Repository
public interface ActivityDao extends JpaRepository<Activity, Long> {
	Activity findByUserAndRecipe(User user, Recipe recipe);
}
