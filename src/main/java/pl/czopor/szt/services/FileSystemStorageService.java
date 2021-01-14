package pl.czopor.szt.services;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;

@Service
public class FileSystemStorageService {

	@Value("${file-storage.resources-path}")
	private String RESOURCES_PATH;

	public String save(byte[] content, String imageName) throws Exception {
		
		long timeStamp = new Date().getTime();
		String fileName = timeStamp + imageName;
		Path newFile = Paths.get(RESOURCES_PATH + fileName);
		Files.createDirectories(newFile.getParent());

		Files.write(newFile, content);

		return fileName;
	}

	public Resource loadFileAsResource(String imageName) throws Exception {
		try {
			Path filePath = Paths.get(RESOURCES_PATH + imageName);
			Resource resource = new UrlResource(filePath.toUri());
			if (resource.exists()) {
				return resource;
			} else {
				throw new IOException("File not found " + imageName);
			}
		} catch (MalformedURLException ex) {
			throw new IOException("File not found " + imageName);
		}
	}

	public File getFileByName(String fileName) {
		Path filePath = Paths.get(RESOURCES_PATH + fileName);
		return new File(filePath.toAbsolutePath().toString());
	}
}
