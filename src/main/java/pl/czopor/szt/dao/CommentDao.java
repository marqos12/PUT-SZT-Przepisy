package pl.czopor.szt.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import pl.czopor.szt.models.Comment;

@Repository
public interface CommentDao extends JpaRepository<Comment, Long>{

}
