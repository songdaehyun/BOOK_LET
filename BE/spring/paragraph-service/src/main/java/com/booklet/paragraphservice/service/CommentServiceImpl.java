package com.booklet.paragraphservice.service;

import com.booklet.paragraphservice.dto.comment.CommentDto;
import com.booklet.paragraphservice.dto.comment.CommentListDto;
import com.booklet.paragraphservice.dto.paragraph.ParagraphDto;
import com.booklet.paragraphservice.entity.Comment;
import com.booklet.paragraphservice.entity.Paragraph;
import com.booklet.paragraphservice.entity.User;
import com.booklet.paragraphservice.repository.CommentRepository;
import com.booklet.paragraphservice.repository.UserImageRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class CommentServiceImpl implements CommentService {
    private final CommentRepository commentRepository;
    private final UserImageRepository userImageRepository;

    @Transactional
    @Override
    public Long saveComment(CommentDto commentDto) {
        Comment comment = Comment.builder()
                .commentContent(commentDto.getCommentContent())
                .commentGroup(commentDto.getCommentGroup())
                .commentDepth(commentDto.getCommentDepth())
                .paragraph(commentDto.getParagraph())
                .user(commentDto.getUser())
                .build();
        Long commentId = 0L;
        commentId = commentRepository.save(comment).getCommentId();
        if (comment.getCommentGroup() == 0L) { // 부모댓글이면 group update
            comment.updateCommentGroup();
            commentRepository.save(comment);
        }
        return commentId;
    }

    @Override
    public List<CommentListDto> findComments(Paragraph paragraph) {
        List<Comment> commentList = commentRepository.findCommentsByParagraph(paragraph);
        List<CommentListDto> comments = new ArrayList<>();
        for (Comment c : commentList) {
            User u = c.getUser();
            String userImage = userImageRepository.findUserImageByUser(u);
            CommentListDto commentListDto = new CommentListDto(c.getCommentId(), c.getCommentContent(), c.getCommentGroup(), c.getCommentDepth(), c.getCreatedDate(), c.getModifiedDate(), u.getUserId(), u.getNickname(), userImage);
            comments.add(commentListDto);
        }
        return comments;
    }

    @Transactional
    @Override
    public boolean updateComment(Long commentId, String commentContent) {
        Comment comment = commentRepository.findById(commentId).orElseGet(Comment::new);
        if (comment.getCommentId() == null) return false;

        comment.updateCommentUpdate(commentContent);
        commentRepository.save(comment);
        return true;
    }

    @Transactional
    @Override
    public boolean deleteComment(Long commentId) {
        Comment comment = commentRepository.findById(commentId).orElseGet(Comment::new);
        if (comment.getCommentId() == null) return false;
//        // 댓글 디비에 존재하는거 확인함
////        commentRepository.delete(comment);
//        commentRepository.deleteById(commentId);
          // 대댓글 후순위 로직
        if (comment.getCommentDepth() == 0) { // 부모 댓글이면 자식 댓글이 있는지 확인
            if (commentRepository.countByCommentGroup(comment.getCommentGroup()) > 1) {
                // 있으면
                comment.updateCommentUpdate("");
                commentRepository.save(comment);
            } else { // 없으면
                commentRepository.delete(comment);
            }
        } else { // 자식 댓글은 그냥 삭제
            Long parentId = comment.getCommentGroup();
            commentRepository.delete(comment);
            // 삭제하고 부모댓글에 자식 댓글이 남았는지 확인
            if (commentRepository.countByCommentGroup(parentId) == 1) {
                // 본인만 남았다면
                Comment parent = commentRepository.findById(parentId).orElseGet(Comment::new);
                if (parent.getCommentId() == null) return false;
                if(parent.getCommentContent().equals("")){ // 삭제된 댓글이면
                    commentRepository.delete(parent);
                }
            }
        }

        return true;
    }


}
