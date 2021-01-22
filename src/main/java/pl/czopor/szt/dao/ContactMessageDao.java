package pl.czopor.szt.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import pl.czopor.szt.models.ContactMessage;

@Repository
public interface ContactMessageDao extends JpaRepository<ContactMessage, Long> {
}
