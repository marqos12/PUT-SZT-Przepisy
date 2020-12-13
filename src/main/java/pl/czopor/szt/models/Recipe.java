package pl.czopor.szt.models;

import java.time.LocalDateTime;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import lombok.Data;
import pl.czopor.szt.enums.RecipeComplexity;

@Data
@Entity
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
	
    private String name;
	private String description;
	private String image;
	private RecipeComplexity complexity;
	private String portions;
	private String duration;
	private Double mark;
	
	
}
