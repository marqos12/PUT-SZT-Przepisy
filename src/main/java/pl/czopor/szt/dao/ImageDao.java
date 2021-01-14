package pl.czopor.szt.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import pl.czopor.szt.models.Image;

@Repository
public interface ImageDao extends JpaRepository<Image, Long> {
	Image findByTitle(String title);
}
