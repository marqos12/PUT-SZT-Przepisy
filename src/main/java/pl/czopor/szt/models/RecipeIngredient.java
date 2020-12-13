package pl.czopor.szt.models;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.Data;

@Data
@Entity
public class RecipeIngredient {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	private Recipe recipe;

	@ManyToOne(fetch = FetchType.LAZY)
	private Ingredient ingredient;
	
	private Double quantity;
	private Boolean required;
}
