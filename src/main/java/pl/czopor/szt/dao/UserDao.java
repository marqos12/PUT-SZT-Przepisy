package pl.czopor.szt.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import pl.czopor.szt.models.User;

@Repository
public interface UserDao extends JpaRepository<User, Long> {
	public Optional<User> findByUsername(String username);
}
