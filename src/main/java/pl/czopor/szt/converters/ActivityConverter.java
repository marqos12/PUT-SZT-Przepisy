package pl.czopor.szt.converters;

import java.util.Objects;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import pl.czopor.szt.dto.ActivityDto;
import pl.czopor.szt.models.Activity;

@AllArgsConstructor
@Service
public class ActivityConverter implements Converter<Activity, ActivityDto> {
	private UserConverter userConverter;

	public Activity mapFromDto(ActivityDto activityDto) {
		return Activity.builder().id(activityDto.id).user(userConverter.mapFromDto(activityDto.user))
				.wantToCook(activityDto.wantToCook).build();
	}

	public ActivityDto mapToDto(Activity activity) {
		if (Objects.isNull(activity))
			return null;
		return ActivityDto.builder().id(activity.getId()).user(userConverter.mapToDto(activity.getUser()))
				.wantToCook(activity.getWantToCook()).build();
	}

}