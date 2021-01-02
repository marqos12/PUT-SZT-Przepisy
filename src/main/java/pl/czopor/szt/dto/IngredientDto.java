package pl.czopor.szt.dto;

import lombok.Builder;

@Builder
public class IngredientDto {
	public Long id;
	public String name;
	public String unit;
}
