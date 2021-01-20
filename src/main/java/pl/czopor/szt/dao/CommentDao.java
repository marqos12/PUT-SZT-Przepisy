package pl.czopor.szt.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import pl.czopor.szt.models.Comment;
import pl.czopor.szt.models.Recipe;

@Repository
public interface CommentDao extends JpaRepository<Comment, Long> {
	List<Comment> findByRecipe(Recipe recipe);
}
