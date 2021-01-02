package pl.czopor.szt.dto;

import java.util.List;

import lombok.Builder;

@Builder
public class RecipeTypeDto {
	public Long id;
	public String name;
	public RecipeTypeDto parent;
	public List<RecipeTypeDto> children;

}
