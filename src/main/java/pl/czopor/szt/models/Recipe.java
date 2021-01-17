package pl.czopor.szt.models;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.czopor.szt.enums.RecipeComplexity;

@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Recipe {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private User user;

	@ManyToOne(fetch = FetchType.LAZY)
	private RecipeType recipeType;

	@CreatedDate
	private Date createdAt;

	@LastModifiedDate
	private LocalDateTime updatedAt;

	@Column(length = 10000)
	private String description;

	private String shortDescription;
	private String name;

	private RecipeComplexity complexity;
	private String portions;
	private Long duration;
	private Double mark;

	@OneToMany(cascade = CascadeType.ALL)
	private List<Comment> comments;

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<RecipeIngredient> ingredients;

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<Step> steps;

	@OneToMany(cascade = CascadeType.ALL)
	private List<Image> images;

	@OneToMany(cascade = CascadeType.ALL)
	private List<Activity> activities;

}
