package pl.czopor.szt.converters;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import pl.czopor.szt.dao.RecipeDao;
import pl.czopor.szt.dto.ImageDto;
import pl.czopor.szt.models.Image;
import pl.czopor.szt.models.Recipe;
import static pl.czopor.szt.services.ImageService.THUMBNAIL_PREFIX;

@AllArgsConstructor
@Service
public class ImageConverter implements Converter<Image, ImageDto> {
	private RecipeDao recipeDao;

	@Override
	public Image mapFromDto(ImageDto imageDto) {
		return Image.builder()
				.id(imageDto.id)
				.title(imageDto.title)
				.type(imageDto.type)
				.imageSrc(imageDto.previewImageSrc)
				.alt(imageDto.alt)
				.recipe(recipeDao.getOne(imageDto.recipeId))
				.build();
	}

	@Override
	public ImageDto mapToDto(Image image) {
		return ImageDto.builder()
				.id(image.getId())
				.title(image.getTitle())
				.type(image.getType())
				.alt(image.getAlt())
				.recipeId(image.getRecipe().getId())
				.previewImageSrc(image.getImageSrc())
				.thumbnailImageSrc(THUMBNAIL_PREFIX + image.getImageSrc())
				.build();
	}

	public Image mapFromMultipartFile(MultipartFile file, String fileName, Recipe recipe) {
		return Image.builder()
				.title(file.getOriginalFilename())
				.type(file.getContentType())
				.imageSrc(fileName)
				.alt(file.getOriginalFilename())
				.recipe(recipe)
				.build();
	}

}
