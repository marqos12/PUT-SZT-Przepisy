package pl.czopor.szt.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import pl.czopor.szt.converters.CommentConverter;
import pl.czopor.szt.dao.CommentDao;
import pl.czopor.szt.dao.RecipeDao;
import pl.czopor.szt.dto.CommentDto;
import pl.czopor.szt.models.Comment;
import pl.czopor.szt.models.Recipe;
import pl.czopor.szt.models.User;

@Service
@AllArgsConstructor
public class CommentService {
	CommentDao commentDao;
	RecipeDao recipeDao;
	UserService userService;
	CommentConverter commentConverter;

	public CommentDto saveComment(CommentDto commentDto) {
		Comment comment = null;
		if (Objects.nonNull(commentDto.id)) {
			comment = commentDao.findById(commentDto.id).orElse(null);
			comment.setIsEdited(true);
		}
		if (Objects.isNull(comment)) {
			Recipe recipe = recipeDao.findById(commentDto.recipe.id).orElse(null);
			User user = userService.getActiveUser();
			comment = Comment.builder().recipe(recipe).user(user).date(LocalDateTime.now()).build();
		}
		comment.setContent(commentDto.content);

		comment = commentDao.save(comment);
		return commentConverter.mapToDto(comment);
	}

	public List<CommentDto> getCommentsForRecipe(long recipeId) {
		Recipe recipe = recipeDao.findById(recipeId).orElse(null);
		List<Comment> comments = commentDao.findByRecipe(recipe);
		return comments.stream().map(commentConverter::mapToDto).collect(Collectors.toList());
	}

	public boolean deleteComment(Long commentId) {
		User user = userService.getActiveUser();
		Comment comment = commentDao.getOne(commentId);
		if (Objects.nonNull(comment) && Objects.nonNull(user) && comment.getUser().getId().equals(user.getId())) {
			commentDao.delete(comment);
			return true;
		}
		return false;
	}

}
