package pl.czopor.szt.services;

import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import javax.imageio.ImageIO;

import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import pl.czopor.szt.converters.ImageConverter;
import pl.czopor.szt.converters.RecipeConverter;
import pl.czopor.szt.dao.RecipeDao;
import pl.czopor.szt.dto.RecipeDto;
import pl.czopor.szt.models.Image;
import pl.czopor.szt.models.Recipe;

@Service
@AllArgsConstructor
public class ImageService {
	private RecipeDao recipeDao;
	private ImageConverter imageConverter;
	private FileSystemStorageService fileSystemStorageService;
	private RecipeConverter recipeConverter;

	public static String THUMBNAIL_PREFIX = "tn_";

	public RecipeDto saveImages(List<MultipartFile> files, Long recipeId) {
		Recipe recipe = recipeDao.getOne(recipeId);
		List<Image> images = new ArrayList<>();

		for (MultipartFile file : files) {
			String fileName = saveImageInStorage(file);
			if (Objects.nonNull(fileName)) {
				Image image = imageConverter.mapFromMultipartFile(file, fileName, recipe);
				images.add(image);
			}
		}

		recipe.setImages(images);
		recipe = recipeDao.save(recipe);

		return recipeConverter.mapToDto(recipe);
	}

	private String saveImageInStorage(MultipartFile file) {
		try {
			String imageName = fileSystemStorageService.save(file.getBytes(), file.getOriginalFilename());
			resizeAndSaveImage(imageName);
			return imageName;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	public Resource getImage(String fileName) {
		Resource resource = null;
		try {
			resource = fileSystemStorageService.loadFileAsResource(fileName);
		} catch (Exception e) {
			e.printStackTrace();
		}

		return resource;
	}

	private String resizeAndSaveImage(String imageName) throws IOException {

		File file = fileSystemStorageService.getFileByName(imageName);
		BufferedImage inputImage = ImageIO.read(file);
		double thumbnailWidth = 300.0;
		double percent = thumbnailWidth / inputImage.getWidth();
		int scaledWidth = (int) (inputImage.getWidth() * percent);
		int scaledHeight = (int) (inputImage.getHeight() * percent);

		BufferedImage outputImage = new BufferedImage(scaledWidth, scaledHeight, inputImage.getType());

		Graphics2D g2d = outputImage.createGraphics();
		g2d.drawImage(inputImage, 0, 0, scaledWidth, scaledHeight, null);
		g2d.dispose();

		String formatName = imageName.substring(imageName.lastIndexOf(".") + 1);
		String thumbnailFileName = THUMBNAIL_PREFIX + imageName;
		String thumbnailFilePath = file.getParent() + "\\" + thumbnailFileName;

		ImageIO.write(outputImage, formatName, new File(thumbnailFilePath));
		return thumbnailFileName;
	}
}
