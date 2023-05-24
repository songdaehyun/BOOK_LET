package com.booklet.authservice.controller;

import com.booklet.authservice.dto.FollowReqDto;
import com.booklet.authservice.dto.SignUpReqDto;
import com.booklet.authservice.dto.UserTasteReqDto;
import com.booklet.authservice.entity.Book;
import com.booklet.authservice.entity.User;
import com.booklet.authservice.repository.BookRepository;
import com.booklet.authservice.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    private final BookRepository bookRepository;
    // pagenation 테스트
    @GetMapping("/books")
    public ResponseEntity books(int size, int page) {
        // page : 요청할 페이지 번호, size : 한 페이지 당 조회 할 개수
        PageRequest pageRequest = PageRequest.of(page, size);
        Slice<Book> result= bookRepository.findAllBy(pageRequest);
        List<Book> result2 = result.getContent();
        System.out.println(result2.toString());
        for (Book book : result2) {
            System.out.println(book.getBookTitle().toString());

        }
        return new ResponseEntity(result, HttpStatus.OK);
    }

    @GetMapping("/{username}")
    public ResponseEntity getUserInfo(@PathVariable String username) {

        HashMap<String, Object> result = new HashMap<>();

        result = userService.findUserInfo(username);

        if (result == null) {
            result.put("message", "fail");
            return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);

        } else {
            result.put("message", "success");
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
    }

    @PostMapping("/follow")
    public ResponseEntity follow(@RequestBody FollowReqDto followReqDto) {

        HashMap<String, Object> result = new HashMap<>();

        Boolean check = userService.following(followReqDto);

        if (check != true) {
            System.out.println("컨트롤러 : 읍음");
            result.put("message", "fail");
            return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);

        } else {
            System.out.println("컨트롤러 : 잇음");
            result.put("message", "success");
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
    }

    @GetMapping("/follow/{username}")
    public ResponseEntity follow(@PathVariable String username) {

        HashMap<String, Object> result = userService.findfollowInfo(username);

        if (result == null) {
            result.put("message", "fail");
            return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);

        } else {
            result.put("message", "success");
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
    }

    @GetMapping("/prefer/hashtag")
    public ResponseEntity getAllHashtag() {

        HashMap<String, Object> result = new HashMap<>();

        List<Map> item = userService.findAllHashtags();
        result.put("message", "success");
        result.put("data", item);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/like/book/{username}")
    public ResponseEntity getUserLikeBooks(@PathVariable String username) {
        HashMap<String, Object> result = userService.findUserLikeBooks(username, 0);
        if (result == null) {
            result.put("message", "fail");
            return new ResponseEntity(result, HttpStatus.BAD_REQUEST);
        }
        result.put("message", "success");

        return new ResponseEntity(result, HttpStatus.OK);
    }

    @PostMapping("/taste/{username}")
    public ResponseEntity saveUserTaste(@RequestBody UserTasteReqDto userTasteReqDto, @PathVariable String username) {

        HashMap<String, Object> result = new HashMap<>();

        Boolean check = userService.saveUserTaste(userTasteReqDto, username);

        if (check != true) {
            result.put("message", "fail");
            return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);

        } else {
            result.put("message", "success");
            Boolean checkCover = userService.saveUserBookCover(userTasteReqDto, username);
            HashMap<String, Object> saveResult = userService.saveUserPreferScore(username);
            result.put("preferType", saveResult.get("type"));
            result.put("preferScore", saveResult.get("score"));
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
    }

    @GetMapping("/like/book/all/{username}")
    public ResponseEntity getAllUserLikeBooks(@PathVariable String username) {
        HashMap<String, Object> result = userService.findUserLikeBooks(username, 1);
        if (result == null) {
            result.put("message", "fail");
            return new ResponseEntity(result, HttpStatus.BAD_REQUEST);
        }
        result.put("message", "success");

        return new ResponseEntity(result, HttpStatus.OK);
    }

    @GetMapping("/review/pre/{username}")
    public ResponseEntity getUserReviews(@PathVariable String username) {
        // page : 요청할 페이지 번호, size : 한 페이지 당 조회 할 개수
//        PageRequest pageRequest = PageRequest.of(page, size);
        HashMap<String, Object> result = userService.findUserReviews(username, 0);
        if (result == null) {
            result.put("message", "fail");
            return new ResponseEntity(result, HttpStatus.BAD_REQUEST);
        }
        result.put("message", "success");

        return new ResponseEntity(result, HttpStatus.OK);
    }

    @GetMapping("/review/all/{username}")
    public ResponseEntity getAllUserReviews(@PathVariable String username) {
        // page : 요청할 페이지 번호, size : 한 페이지 당 조회 할 개수
//        PageRequest pageRequest = PageRequest.of(page, size);
        HashMap<String, Object> result = userService.findUserReviews(username, 1);
        if (result == null) {
            result.put("message", "fail");
            return new ResponseEntity(result, HttpStatus.BAD_REQUEST);
        }
        result.put("message", "success");

        return new ResponseEntity(result, HttpStatus.OK);
    }

    @GetMapping("/prefer/cover")
    public ResponseEntity getBookCovers() {
        HashMap<String, Object> result = userService.findBookCovers();
        if (result == null) {
            result.put("message", "fail");
            return new ResponseEntity(result, HttpStatus.BAD_REQUEST);
        }
        result.put("message", "success");

        return new ResponseEntity(result, HttpStatus.OK);
    }
}
