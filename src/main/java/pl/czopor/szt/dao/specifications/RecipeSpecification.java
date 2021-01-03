package pl.czopor.szt.dao.specifications;

import java.util.Objects;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import lombok.RequiredArgsConstructor;
import pl.czopor.szt.dto.RecipeFilters;
import pl.czopor.szt.enums.RecipeComplexity;
import pl.czopor.szt.models.Recipe;

@RequiredArgsConstructor
public class RecipeSpecification implements Specification<Recipe> {
	private static final long serialVersionUID = -7581433125885237612L;

	private final RecipeFilters filters;
	private Predicate predicate;
	private CriteriaBuilder builder;

	private void and(Predicate predicate2) {
		this.predicate = builder.and(predicate, predicate2);
	}

	private Predicate or(Predicate predicate1, Predicate predicate2) {
		return builder.or(predicate1, predicate2);
	}

	@Override
	public Predicate toPredicate(Root<Recipe> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
		builder = criteriaBuilder;
		predicate = criteriaBuilder.conjunction();

		if (Objects.nonNull(filters.durationFrom)) {
			and(criteriaBuilder.greaterThanOrEqualTo(root.get("duration"), filters.durationFrom));
		}

		if (Objects.nonNull(filters.durationTo)) {
			and(criteriaBuilder.lessThanOrEqualTo(root.get("duration"), filters.durationTo));
		}

		if (Objects.nonNull(filters.name)) {
			and(criteriaBuilder.like(criteriaBuilder.lower(root.get("name")),
					("%" + filters.name.toLowerCase() + "%")));
		}

		if (Objects.nonNull(filters.complexity) && !filters.complexity.isEmpty()) {
			Predicate predicate = criteriaBuilder.disjunction();
			for (RecipeComplexity complexity : filters.complexity) {
				predicate = or(predicate, criteriaBuilder.equal(root.get("complexity"), complexity));
			}
			and(predicate);
		}

		if (Objects.nonNull(filters.ingredients) && !filters.ingredients.isEmpty()) {
			Predicate predicate = criteriaBuilder.disjunction();
			for (Long ingredientId : filters.ingredients) {
				predicate = or(predicate,
						criteriaBuilder.equal(root.join("ingredients").join("ingredient").get("id"), ingredientId));
			}
			and(predicate);
		}

		if (Objects.nonNull(filters.type) && !filters.type.isEmpty()) {
			Predicate predicate = criteriaBuilder.disjunction();
			for (Long typeId : filters.type) {
				predicate = or(predicate, criteriaBuilder.equal(root.get("recipeType").get("id"), typeId));
			}
			and(predicate);
		}

		return predicate;
	}

}
