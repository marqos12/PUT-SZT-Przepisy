package pl.czopor.szt.dto;

import java.util.List;

public class PageDto<T> {
	public List<T> content;
	public Long totalPAges;
	public Long totalElements;
	public Long size;
	public Long number;
	public Long numberOfElements;
}