package com.booklet.paragraphservice.util;

import com.booklet.paragraphservice.dto.ScoreDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.nio.charset.StandardCharsets;
import java.util.Collections;
import java.util.HashMap;
import java.util.Objects;

@Component
@RequiredArgsConstructor
@Slf4j
public class RequestTools {

    public HashMap<String, Object> getScoreAndTyp(String paragraphContent){
        RestTemplate restTemplate = new RestTemplate();
        MultiValueMap<String, String> formData = new LinkedMultiValueMap<>();
        formData.add("sentence", paragraphContent);

        String url = "https://j8b306.p.ssafy.io/basic_recom/sentence/cal/";
//        String url = "http://192.168.31.193:8000/basic_recom/sentence/cal/";

        // create header
        HttpHeaders headers = new HttpHeaders();
        headers.setAcceptCharset(Collections.singletonList(StandardCharsets.UTF_8));
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        HashMap<String, Object> map = new HashMap<>();
        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(formData, headers);
        ResponseEntity<ScoreDto> response = restTemplate.exchange(url, HttpMethod.POST, requestEntity, ScoreDto.class);
        if(response.getStatusCodeValue()!=200) return new HashMap<>();
        try {
//            System.out.println(response.getBody().getScore().getNeg());
//            System.out.println("HHHHHHHHHHHHEEEEEEEEEEEEERRRRRRRRRRRRRRR");
//            System.out.println(response.getStatusCodeValue());
            ScoreDto scoreDto = response.getBody();
            if(scoreDto.getState() == 0){
                map.put("type", "N");
                map.put("score", scoreDto.getScore().getNeg());
            }else{
                map.put("type", "P");
                map.put("score", scoreDto.getScore().getPos());
            }

        } catch (Exception e){
            log.info("요청 변환에 실패하였습니다" + restTemplate.postForObject(url, requestEntity, String.class));
        }
        return map;
    }
}
