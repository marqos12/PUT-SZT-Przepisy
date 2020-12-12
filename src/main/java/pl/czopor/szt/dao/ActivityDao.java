package pl.czopor.szt.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import pl.czopor.szt.models.Activity;

@Repository
public interface ActivityDao extends JpaRepository<Activity, Long>{

}
