package pl.czopor.szt.converters;

public interface Converter<T, K> {
	public T mapFromDto(K dto);

	public K mapToDto(T model);
}
