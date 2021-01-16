package pl.czopor.szt.dto;

import lombok.Builder;

@Builder
public class StepDto {
	public Long id;
	public int number;
	public String description;
	public boolean isNew;
}
