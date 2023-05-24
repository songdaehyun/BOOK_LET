package com.booklet.bookservice.controller;

import com.booklet.bookservice.dto.ReviewCreateReq;
import com.booklet.bookservice.dto.ReviewDto;
import com.booklet.bookservice.entity.Book;
import com.booklet.bookservice.entity.Review;
import com.booklet.bookservice.entity.User;
import com.booklet.bookservice.service.BookService;
import com.booklet.bookservice.service.ReviewService;
import com.booklet.bookservice.service.ReviewServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

import javax.ws.rs.PathParam;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("api/v1/review")
@RequiredArgsConstructor
@Component
public class ReviewController {
    private final ReviewService reviewService;
    private final BookService bookService;

    @GetMapping("/check")
    public String checkReviewController() {
        return "Hello this is review controller";
    }

    @PostMapping
    public ResponseEntity createReview(@RequestBody ReviewDto request) throws Exception {
        HashMap<String, Object> map = new HashMap<>();
        boolean flag = reviewService.saveReview(request);

        if (flag) {
            map.put("message", "success");
            return new ResponseEntity<>(map, HttpStatus.CREATED);

        } else {
            map.put("message", "fail");
            return new ResponseEntity<>(map, HttpStatus.ACCEPTED);
        }
    }

    @GetMapping("/{bookIsbn}")
    public ResponseEntity getReviews(@PathVariable String bookIsbn, @RequestParam Long userId, int page, int size) throws Exception {
        try {
            Map<String, Object> result = new HashMap<>();
            Book book = bookService.findBook(bookIsbn);
            if (book == null) {
                result.put("message", "fail");
                return new ResponseEntity(result, HttpStatus.BAD_REQUEST);
            }
            PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "reviewId"));

            result = reviewService.findReviews(book, userId, pageRequest);
            if (result == null) {
                String message = "not found";
//                result.put("message", "not found");
                return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
            }
            result.put("message", "success");
            return new ResponseEntity<>(result, HttpStatus.ACCEPTED);

        } catch (Exception e) {
            e.printStackTrace();
            Map<String, Object> result = new HashMap<>();
            result.put("message", "fail");
            return new ResponseEntity(result, HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{reviewId}")
    public ResponseEntity updateReview(@PathVariable Long reviewId, @RequestBody ReviewDto req) throws Exception {
        Review review = reviewService.findReviewEntity(reviewId);
        HashMap<String, Object> result = new HashMap<>();
        if (review == null) return new ResponseEntity("not found", HttpStatus.NOT_FOUND);
        try {
            review.updateReview(req.getContent(), req.getGrade());
            if(reviewService.updateReview(review)){
                result.put("message", "success");
            }else result.put("message", "fail");

            return new ResponseEntity(result, HttpStatus.ACCEPTED);
        } catch (Exception e) {
            return new ResponseEntity("fail", HttpStatus.BAD_REQUEST);

        }
    }

    @DeleteMapping("/{reviewId}")
    public ResponseEntity deleteReview(@PathVariable Long reviewId) throws Exception {
        if(reviewService.deleteReview(reviewId))  return new ResponseEntity("success", HttpStatus.ACCEPTED);

        return new ResponseEntity("fail", HttpStatus.BAD_REQUEST);
    }
}