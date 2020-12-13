package pl.czopor.szt.models;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import lombok.Data;
import pl.czopor.szt.dto.RecipeTypeDto;

@Data
@Entity
public class RecipeType {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String name;
	
	@ManyToOne(fetch = FetchType.LAZY)
	private RecipeType parent;

    @OneToMany(fetch = FetchType.EAGER,mappedBy="parent")
    private List<RecipeType> children;
    
    private Boolean isRoot;

    public List<RecipeTypeDto> getChildrenAsDto(){
    	return 	children == null 
    			? 
    			Collections.emptyList() 
    			:
    			children
    			.stream()
    			.map(RecipeTypeDto::mapToDto)
    			.collect(Collectors.toList());
    }
}
