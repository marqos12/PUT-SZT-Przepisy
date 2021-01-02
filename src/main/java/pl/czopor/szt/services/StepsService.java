package pl.czopor.szt.services;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import pl.czopor.szt.dao.StepDao;
import pl.czopor.szt.models.Step;

@Service
@AllArgsConstructor
public class StepsService {

	private StepDao stepDao;

	public void createAndSaveSteps(List<Step> steps) {
		stepDao.saveAll(steps);
	}

}
