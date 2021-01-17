package pl.czopor.szt.services;

import java.util.Objects;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import pl.czopor.szt.converters.ActivityConverter;
import pl.czopor.szt.dao.ActivityDao;
import pl.czopor.szt.dao.UserDao;
import pl.czopor.szt.dto.ActivityDto;
import pl.czopor.szt.models.Activity;
import pl.czopor.szt.models.Recipe;
import pl.czopor.szt.models.User;

@Service
@AllArgsConstructor
public class ActivityService {
	private ActivityDao activityDao;
	private UserDao userDao;
	private UserService userService;
	private ActivityConverter activityConverter;

	public ActivityDto getUserRecipeActivity(Recipe recipe) {
		User activeUser = userService.getActiveUser();

		return activityConverter.mapToDto(activityDao.findByUserAndRecipe(activeUser, recipe));
	}

	public ActivityDto changeWishlist(Recipe recipe, String username, boolean wantToCook) {
		User user = userDao.findByUsername(username).orElse(null);
		if (Objects.isNull(user))
			return null;

		Activity activity = null;
		activity = activityDao.findByUserAndRecipe(user, recipe);

		if (Objects.isNull(activity)) {
			activity = Activity.builder().recipe(recipe).user(user).build();
		}
		activity.setWantToCook(wantToCook);

		return activityConverter.mapToDto(activityDao.save(activity));
	}

}
