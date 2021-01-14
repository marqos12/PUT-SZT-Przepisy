package pl.czopor.szt.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ImageDto {
	public Long id;
	public String title;
	public String type;
	public String alt;
	public String previewImageSrc;
	public String thumbnailImageSrc;
	public Long recipeId;
}