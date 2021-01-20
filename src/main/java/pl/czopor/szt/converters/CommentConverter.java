package pl.czopor.szt.converters;

import java.util.Objects;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import pl.czopor.szt.dto.CommentDto;
import pl.czopor.szt.models.Comment;

@AllArgsConstructor
@Service
public class CommentConverter implements Converter<Comment, CommentDto> {
	RecipeConverter recipeConverter;
	UserConverter userConverter;

	public Comment mapFromDto(CommentDto commentDto) {
		return Comment.builder()
				.id(commentDto.id)
				.content(commentDto.content)
				.user(userConverter.mapFromDto(commentDto.user))
				.date(commentDto.date)
				.recipe(recipeConverter.mapFromDto(commentDto.recipe))
				.build();
	}

	public CommentDto mapToDto(Comment comment) {
		if (Objects.isNull(comment))
			return null;
		return CommentDto.builder()
				.id(comment.getId())
				.user(userConverter.mapToDto(comment.getUser()))
				.content(comment.getContent())
				.date(comment.getDate())
				.build();
	}
}
