package pl.czopor.szt.controllers;

import java.util.List;

import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import pl.czopor.szt.dto.RecipeDto;
import pl.czopor.szt.services.ImageService;

@RestController
@AllArgsConstructor
@RequestMapping("/api/images")
public class ImagesController {
	private ImageService imagesService;

	@PostMapping("/upload")
	@Secured("ROLE_USER")
	public ResponseEntity<RecipeDto> uplaodImage(@RequestParam("imageFile") List<MultipartFile> files,
			@RequestParam("recipeId") Long recipeId) {

		return ResponseEntity.ok(imagesService.saveImages(files, recipeId));
	}

	@GetMapping("/download/{fileName}")
	public ResponseEntity<Resource> downloadFile(@PathVariable String fileName) {
		
		if (fileName != null && !fileName.isEmpty()) {
			Resource resource = imagesService.getImage(fileName);
			String contentType = "application/octet-stream";
			
			return ResponseEntity.ok()
					.contentType(MediaType.parseMediaType(contentType))
					.header(HttpHeaders.CONTENT_DISPOSITION, 
							"attachment; filename=\"" + resource.getFilename() + "\"")
					.body(resource);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

}
