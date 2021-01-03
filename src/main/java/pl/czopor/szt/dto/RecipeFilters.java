package pl.czopor.szt.dto;

import java.util.List;

import lombok.Builder;
import pl.czopor.szt.enums.RecipeComplexity;

@Builder
public class RecipeFilters {
	public String name;
	public Long durationFrom;
	public Long durationTo;
	public List<RecipeComplexity> complexity;
	public List<Long> ingredients;
	public List<Long> type;
}
