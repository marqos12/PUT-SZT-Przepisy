package pl.czopor.szt.controllers;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import pl.czopor.szt.dao.ContactMessageDao;
import pl.czopor.szt.models.ContactMessage;

@RestController
@RequestMapping("/api/contactMessage")
@AllArgsConstructor
public class ContactMessageController {

	ContactMessageDao contactMessageDao;

	@PostMapping()
	public ContactMessage addContactMessage(@RequestBody ContactMessage contactMessage) {
		return contactMessageDao.save(contactMessage);

	}
}
