package com.booklet.bookservice.controller;

import com.booklet.bookservice.dto.BookDetailRes;
import com.booklet.bookservice.dto.BookLikeReq;
import com.booklet.bookservice.service.BookLikeService;
import com.booklet.bookservice.service.BookService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;


@Slf4j
@RestController
@RequestMapping("api/v1/book")
@RequiredArgsConstructor
@Component
public class BookController {
    private final BookLikeService bookLikeService;
    private final BookService bookService;


    /** 도서 좋아요 등록 및 취소 **/
    @PostMapping("/like")
    public ResponseEntity LikeBook(@RequestBody BookLikeReq request) throws Exception{
        String result="";
        if(bookLikeService.findLike(request)){ // 좋아요 존재 시 취소
            if(bookLikeService.deleteLike(request)){
                result = "cancel";
            }else{
                result = "fail";
            }
        }else{ // 좋아요 등록
            if(bookLikeService.createLike(request)) {
                result = "like";
            }
            else result = "fail";
        }
        return new ResponseEntity<>(result, HttpStatus.ACCEPTED);
    }

    @GetMapping("/{bookIsbn}")
    public ResponseEntity getBookDetail(@RequestParam Long userId, @PathVariable String bookIsbn) throws Exception{
        try {
            BookDetailRes detailRes = bookService.findBookDetail(bookIsbn, userId);
            return new ResponseEntity(detailRes, HttpStatus.ACCEPTED);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity("fail", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/author/{authorId}")
    public ResponseEntity getAuthorBook(@PathVariable Long authorId, int size, int page) throws Exception{
        try {
            PageRequest pageRequest = PageRequest.of(page, size);
            HashMap<String, Object> map = new HashMap<>();
            map = bookService.findAuthorBook(authorId, pageRequest);
            return new ResponseEntity(map, HttpStatus.ACCEPTED);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity("fail", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/search")
    public ResponseEntity searchBooks(@RequestParam String bookTitle, int size, int page) throws Exception{
        PageRequest pageRequest = PageRequest.of(page, size);
        HashMap<String, Object> map = new HashMap<>();
        map = bookService.searchBooks(bookTitle, pageRequest);

        return new ResponseEntity(map, HttpStatus.ACCEPTED);
    }

}
