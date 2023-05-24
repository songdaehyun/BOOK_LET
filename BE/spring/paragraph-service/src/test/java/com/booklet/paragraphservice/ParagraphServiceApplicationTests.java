package com.booklet.paragraphservice;

import com.booklet.paragraphservice.util.RequestTools;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.web.client.RestTemplate;

@SpringBootTest
class ParagraphServiceApplicationTests {

	@Test
	void contextLoads() {

	}

	@Test
	public void psotRequestTest(){
		RequestTools requestTools = new RequestTools();
		requestTools.getScoreAndTyp("재산깨나 있는 독신 남자에게 아내가 꼭 필요하다는 것은 누구나 인정하는 진리이다");
	}

}
