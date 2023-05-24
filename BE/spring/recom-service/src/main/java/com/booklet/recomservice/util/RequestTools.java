package com.booklet.recomservice.util;

import com.booklet.recomservice.dto.CoverDataDto;
import com.booklet.recomservice.dto.DataDto;
import com.booklet.recomservice.dto.SentenceDto;
import com.booklet.recomservice.entity.Book;
import com.booklet.recomservice.entity.User;
import com.booklet.recomservice.repository.BookRepository;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.http.client.methods.HttpHead;
import org.json.JSONArray;
import org.json.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.context.annotation.Bean;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.nio.charset.StandardCharsets;
import java.util.*;

@Slf4j
@Component
@RequiredArgsConstructor
public class RequestTools {

    private final BookRepository bookRepository;
    RestTemplate restTemplate = new RestTemplate();

    public CoverDataDto getRecomCover(String isbn) {
        Book book = bookRepository.findByBookIsbn(isbn);
        log.info("Django 서버로 책 추천 요청 준비");
        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl("https://j8b306.p.ssafy.io/cover_recom/image")
                .queryParam("book_isbn",isbn).queryParam("book_image", book.getBookImage());
        String url = builder.toUriString();
        log.info("url : "+url);
;
        try {
            CoverDataDto coverDataDto = restTemplate.getForObject(url, CoverDataDto.class);
            return coverDataDto;

        } catch (Exception e){
            log.warn("요청 변환에 실패하였습니다");
            return null;
        }
    }

    public List<String> getRecombooks(String type, User user) {
        log.info("Django 서버로 기본 추천 요청 준비");
        MultiValueMap<String, String> formData = new LinkedMultiValueMap<>();
        System.out.println(user.toString());
        formData.add("user_id", user.getId().toString());
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(formData, headers);

        String setting = null;

        switch (type) {
            case "score":
                setting = "star";
                break;
            case "like":
                setting = "like";
                break;
            case "genre":
                setting = "category";
                break;
            case "user":
                setting = "profile";
                break;
        }
        String url = "https://j8b306.p.ssafy.io/basic_recom/" + setting + "/";
        log.info("url : " + url);

        RestTemplate restTemplate = new RestTemplate();
        try {
            DataDto response = restTemplate.postForObject(url, requestEntity, DataDto.class);
            log.info("요청에 대한 응답 변환 성공" + response.toString());
            return response.getRecom_list();
        } catch (Exception e){
            log.warn("요청 변환에 실패하였습니다");
            return null;
        }
    }

    public List<Long> getRecomParagraphs(User user) {
        log.info("Django 서버로 문장 추천 요청 준비");
        MultiValueMap<String, String> formData = new LinkedMultiValueMap<>();
        formData.add("user_id", user.getId().toString());
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(formData, headers);

        String url = "https://j8b306.p.ssafy.io/basic_recom/sentence/recom/";
//        String url = "http://192.168.31.193:8000/basic_recom/sentence/recom/";
        log.info("url" + url);

        RestTemplate restTemplate = new RestTemplate();
        try {
            SentenceDto response = restTemplate.postForObject(url, requestEntity, SentenceDto.class);
            log.info("요청에 대한 응답 변환 성공" + response.toString());
            return response.getRecom_list();
        } catch (Exception e){
            String response = restTemplate.postForObject(url, requestEntity, String.class);
            log.warn("요청 변환에 실패하였습니다" + response);
            System.out.println();
            return null;
        }
    }
}
