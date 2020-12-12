package pl.czopor.szt.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import pl.czopor.szt.models.Step;

@Repository
public interface StepDao extends JpaRepository<Step, Long>{

}
