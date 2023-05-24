package com.booklet.recomservice.controller;

import com.booklet.recomservice.service.BookService;
import com.booklet.recomservice.service.RecomService;
import com.booklet.recomservice.service.UserService;
import com.booklet.recomservice.util.RequestTools;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("api/v1/recom")
@RequiredArgsConstructor
public class RecomController {

    private final RecomService recomService;
    private final UserService userService;
    private final BookService bookService;

    @GetMapping("/score/pre/{username}")
    public ResponseEntity findScoreRecomBook(@PathVariable String username){
        HashMap<String, Object> result = recomService.getBookRecom("score",username, 0);
        if (result == null) {
            HashMap<String, Object> failResult = new HashMap<>();
            failResult.put("message", "fail");
            return new ResponseEntity<>(failResult, HttpStatus.BAD_REQUEST);
        } else {
            result.put("message", "success");
            result.put("recommendType", "score");
            return new ResponseEntity(result, HttpStatus.OK);
        }
    }

    @GetMapping("/score/all/{username}")
    public ResponseEntity findAllScoreRecomBook(@PathVariable String username){
        HashMap<String, Object> result = recomService.getBookRecom("score",username, 1);
        if (result == null) {
            HashMap<String, Object> failResult = new HashMap<>();
            failResult.put("message", "fail");
            return new ResponseEntity<>(failResult, HttpStatus.BAD_REQUEST);
        } else {
            result.put("message", "success");
            result.put("recommendType", "score");
            return new ResponseEntity(result, HttpStatus.OK);
        }
    }

    @GetMapping("/like/pre/{username}")
    public ResponseEntity findLikeRecomBook(@PathVariable String username){
        HashMap<String, Object> result = recomService.getBookRecom("like",username, 0);
        if (result == null) {
            HashMap<String, Object> failResult = new HashMap<>();
            failResult.put("message", "fail");
            return new ResponseEntity<>(failResult, HttpStatus.BAD_REQUEST);
        } else {
            result.put("message", "success");
            result.put("recommendType", "like");
            return new ResponseEntity(result, HttpStatus.OK);
        }
    }

    @GetMapping("/like/all/{username}")
    public ResponseEntity findAllLikeRecomBook(@PathVariable String username){
        HashMap<String, Object> result = recomService.getBookRecom("like",username, 1);
        if (result == null) {
            HashMap<String, Object> failResult = new HashMap<>();
            failResult.put("message", "fail");
            return new ResponseEntity<>(failResult, HttpStatus.BAD_REQUEST);
        } else {
            result.put("message", "success");
            result.put("recommendType", "like");
            return new ResponseEntity(result, HttpStatus.OK);
        }
    }


    @GetMapping("/genre/pre/{username}")
    public ResponseEntity findGenreRecomBook(@PathVariable String username) {
        HashMap<String, Object> result = recomService.getBookRecom("genre", username, 0);
        if (result == null) {
            HashMap<String, Object> failResult = new HashMap<>();
            failResult.put("message", "fail");
            return new ResponseEntity<>(failResult, HttpStatus.BAD_REQUEST);
        } else {
            result.put("message", "success");
            result.put("recommendType", "genre");
            return new ResponseEntity(result, HttpStatus.OK);
        }
    }

    @GetMapping("/genre/all/{username}")
    public ResponseEntity findAllGenreRecomBook(@PathVariable String username) {
        HashMap<String, Object> result = recomService.getBookRecom("genre", username, 1);
        if (result == null) {
            HashMap<String, Object> failResult = new HashMap<>();
            failResult.put("message", "fail");
            return new ResponseEntity<>(failResult, HttpStatus.BAD_REQUEST);
        } else {
            result.put("message", "success");
            result.put("recommendType", "genre");
            return new ResponseEntity(result, HttpStatus.OK);
        }
    }
    @GetMapping("/user/pre/{username}")
    public ResponseEntity findUserRecomBook(@PathVariable String username){
        HashMap<String, Object> result = recomService.getBookRecom("user",username, 0);
        if (result == null) {
            HashMap<String, Object> failResult = new HashMap<>();
            failResult.put("message", "fail");
            return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        } else {
            result.put("message", "success");
            result.put("recommendType", "user");
            result.put("sex", userService.getUser(username).getSex());
            result.put("age", userService.getUser(username).getAge());
            return new ResponseEntity(result, HttpStatus.OK);
        }
    }

    @GetMapping("/user/all/{username}")
    public ResponseEntity findAllUserRecomBook(@PathVariable String username){
        HashMap<String, Object> result = recomService.getBookRecom("user",username, 1);
        if (result == null) {
            HashMap<String, Object> failResult = new HashMap<>();
            failResult.put("message", "fail");
            return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        } else {
            result.put("message", "success");
            result.put("recommendType", "user");
            result.put("sex", userService.getUser(username).getSex());
            result.put("age", userService.getUser(username).getAge());
            return new ResponseEntity(result, HttpStatus.OK);
        }
    }

    @GetMapping("/cover/pre/{username}")
    public ResponseEntity findRecomBookCover(@PathVariable String username){
        HashMap<String, Object> result = recomService.getBookCoverRecom(username, 0);
        if (result == null) {
            HashMap<String, Object> failresult = new HashMap<>();
            failresult.put("message", "fail");
            return new ResponseEntity<>(failresult, HttpStatus.BAD_REQUEST);
        } else {
            result.put("message", "success");
            result.put("recommendType", "bookCover");
            return new ResponseEntity(result, HttpStatus.OK);
        }
    }

    @GetMapping("/cover/all/{username}")
    public ResponseEntity findallRecomBookCover(@PathVariable String username){
        HashMap<String, Object> result = recomService.getBookCoverRecom(username, 1);
        if (result == null) {
            HashMap<String, Object> failresult = new HashMap<>();
            failresult.put("message", "fail");
            return new ResponseEntity<>(failresult, HttpStatus.BAD_REQUEST);
        } else {
            result.put("message", "success");
            result.put("recommendType", "bookCover");
            return new ResponseEntity(result, HttpStatus.OK);
        }
    }

    @GetMapping("/paragraph/pre/{username}")
    public ResponseEntity findRecomParagraph(@PathVariable String username){
        HashMap<String, Object> result = recomService.getParagraphRecom(username, 0);
        if (result == null) {
            HashMap<String, Object> failresult = new HashMap<>();
            failresult.put("message", "fail");
            return new ResponseEntity<>(failresult, HttpStatus.BAD_REQUEST);
        } else {
            result.put("message", "success");
            return new ResponseEntity(result, HttpStatus.OK);
        }
    }

    @GetMapping("/paragraph/all/{username}")
    public ResponseEntity findallRecomParagraph(@PathVariable String username){
        HashMap<String, Object> result = recomService.getParagraphRecom(username, 1);
        if (result == null) {
            HashMap<String, Object> failresult = new HashMap<>();
            failresult.put("message", "fail");
            return new ResponseEntity<>(failresult, HttpStatus.BAD_REQUEST);
        } else {
            result.put("message", "success");
            return new ResponseEntity(result, HttpStatus.OK);
        }
    }
}
