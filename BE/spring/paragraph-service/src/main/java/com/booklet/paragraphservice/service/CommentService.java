package com.booklet.paragraphservice.service;

import com.booklet.paragraphservice.dto.comment.CommentDto;
import com.booklet.paragraphservice.dto.comment.CommentListDto;
import com.booklet.paragraphservice.entity.Paragraph;

import java.util.List;

public interface CommentService {
    public Long saveComment(CommentDto commentDto); // 댓글 등록
    public List<CommentListDto> findComments(Paragraph paragraph);
    public boolean updateComment(Long commentId, String commentContent);
    public boolean deleteComment(Long CommentId);
}
