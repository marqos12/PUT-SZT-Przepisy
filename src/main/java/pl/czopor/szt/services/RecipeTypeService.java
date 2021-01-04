package pl.czopor.szt.services;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import pl.czopor.szt.converters.RecipeTypeConverter;
import pl.czopor.szt.dao.RecipeTypeDao;
import pl.czopor.szt.dto.RecipeTypeDto;
import pl.czopor.szt.models.RecipeType;

@AllArgsConstructor
@Service
public class RecipeTypeService {

	private RecipeTypeDao recipeTypeDao;

	public RecipeTypeDto saveRecipeType(RecipeTypeDto recipeTypeDto) {
		RecipeType recipeType = RecipeTypeConverter.mapFromDto(recipeTypeDto);
		recipeType.setIsRoot(Objects.isNull(recipeType.getParent()));
		RecipeType savedRecipeType = recipeTypeDao.save(recipeType);
		return RecipeTypeConverter.mapToDto(savedRecipeType);
	}

	public List<RecipeTypeDto> getRecipesByRoot() {
		return recipeTypeDao.findByIsRootIsTrue().stream().map(RecipeTypeConverter::mapToDto)
				.collect(Collectors.toList());
	}

}