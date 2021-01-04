package pl.czopor.szt.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import pl.czopor.szt.models.RecipeType;

@Repository
public interface RecipeTypeDao extends JpaRepository<RecipeType, Long> {
	public List<RecipeType> findByIsRootIsTrue();
}
