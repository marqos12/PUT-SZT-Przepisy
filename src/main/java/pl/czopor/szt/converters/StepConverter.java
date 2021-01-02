package pl.czopor.szt.converters;

import pl.czopor.szt.dto.StepDto;
import pl.czopor.szt.models.Step;

public class StepConverter {

	public static Step mapFromDto(StepDto stepDto) {
		return Step.builder()
				.id(stepDto.id)
				.description(stepDto.description)
				.number(stepDto.number)
				.build();
	}
	
	public static StepDto mapToDto(Step step) {
		return StepDto.builder()
				.description(step.getDescription())
				.id(step.getId())
				.number(step.getNumber())
				.build();
	}
	
}
