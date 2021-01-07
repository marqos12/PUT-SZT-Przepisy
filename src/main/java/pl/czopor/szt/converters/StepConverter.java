package pl.czopor.szt.converters;

import pl.czopor.szt.dto.StepDto;
import pl.czopor.szt.models.Step;

public class StepConverter implements Converter<Step, StepDto> {

	public Step mapFromDto(StepDto stepDto) {
		return Step.builder()
				.id(stepDto.id)
				.description(stepDto.description)
				.number(stepDto.number)
				.build();
	}
	
	public StepDto mapToDto(Step step) {
		return StepDto.builder()
				.description(step.getDescription())
				.id(step.getId())
				.number(step.getNumber())
				.build();
	}
	
}
