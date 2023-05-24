package com.booklet.paragraphservice;

import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import javax.annotation.PostConstruct;
import java.util.TimeZone;

@EnableJpaAuditing
@SpringBootApplication
public class ParagraphServiceApplication {
	// 한국 시간설정
	@PostConstruct
	void started() {
		TimeZone.setDefault(TimeZone.getTimeZone("Asia/Seoul"));
	}
	public static void main(String[] args) {
		SpringApplication.run(ParagraphServiceApplication.class, args);
	}
	@Bean
	public ModelMapper modelMapper(){
		ModelMapper modelMapper = new ModelMapper();
		modelMapper.getConfiguration().setAmbiguityIgnored(true);
		return modelMapper;
	}
}
