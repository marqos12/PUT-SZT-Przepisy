package pl.czopor.szt.converters;

import org.springframework.stereotype.Service;

@Service
public interface Converter<T, K> {
	public T mapFromDto(K dto);
	public K mapToDto(T model);
}
