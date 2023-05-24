package com.booklet.paragraphservice.controller;

import com.booklet.paragraphservice.dto.comment.CommentCreateReq;
import com.booklet.paragraphservice.dto.comment.CommentDto;
import com.booklet.paragraphservice.dto.comment.CommentListDto;
import com.booklet.paragraphservice.dto.comment.CommentUpdateReq;
import com.booklet.paragraphservice.entity.Paragraph;
import com.booklet.paragraphservice.service.CommentService;
import com.booklet.paragraphservice.service.ParagraphService;
import com.booklet.paragraphservice.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("api/v1/comment")
@RequiredArgsConstructor
@Component
public class CommentController {
    private final CommentService commentService;
    private final UserService userService;
    private final ParagraphService paragraphService;

    /**
     * 댓글 작성
     */
    @PostMapping
    public ResponseEntity createComment(@RequestBody CommentCreateReq request) throws Exception {
        CommentDto commentDto = new CommentDto(request);
//        log.info("HEEEEEEEERRRRRR : {}", commentDto.getCommentContent());
        commentDto.setUser(userService.getUser(request.getUserId()));
        commentDto.setParagraph(paragraphService.findParagraphEntity(request.getParagraphId()));
        Long commentId = commentService.saveComment(commentDto);
        if (commentId > 0L) return new ResponseEntity("success", HttpStatus.ACCEPTED);
        return new ResponseEntity("fail", HttpStatus.BAD_REQUEST);
    }

    /**
     * 댓글 목록 조회
     */
    @GetMapping("/{paragraphId}")
    public ResponseEntity getComments(@PathVariable Long paragraphId) throws Exception {
        HashMap<String, Object> result = new HashMap<>();
        try {
            Paragraph paragraph = paragraphService.findParagraphEntity(paragraphId);
            List<CommentListDto> comments = commentService.findComments(paragraph);
            if (comments.size() > 0) {
                result.put("comments", comments);
                result.put("message", "success");
            } else {
                result.put("message", "no comments");
            }
        } catch (Exception e) {
            result.put("message", "fail");
            return new ResponseEntity(result, HttpStatus.BAD_REQUEST);

        }
        return new ResponseEntity(result, HttpStatus.ACCEPTED);
    }

    /**
     * 댓글 수정
     **/
    @PutMapping
    public ResponseEntity updateComment(@RequestBody CommentUpdateReq request) throws Exception {
        HashMap<String, Object> result = new HashMap<>();
        HttpStatus status;
        if(commentService.updateComment(request.getCommentId(), request.getCommentContent())){
            status = HttpStatus.ACCEPTED;
            result.put("message", "success");
        }else {
            status = HttpStatus.BAD_REQUEST;
            result.put("message","fail");
        }
        return new ResponseEntity(result,status);
    }

    /** 댓글 삭제 **/
    @DeleteMapping("/{commentId}")
    public ResponseEntity deleteComment(@PathVariable Long commentId) throws Exception{
        HashMap<String, Object> result = new HashMap<>();
        HttpStatus status;
        if(commentService.deleteComment(commentId)) {
            status = HttpStatus.ACCEPTED;
            result.put("message", "success");
        }
        else {
            status = HttpStatus.BAD_REQUEST;
            result.put("message","fail");
        }
        return new ResponseEntity(result,status);
    }
}
