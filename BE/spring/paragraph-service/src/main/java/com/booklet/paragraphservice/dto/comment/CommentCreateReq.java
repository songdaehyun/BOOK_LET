package com.booklet.paragraphservice.dto.comment;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CommentCreateReq {
    private Long paragraphId;
    private Long userId;
    private String commentContent;
    private Long parentCommentId; // 0이면 부모댓글, 1~n : 아기 댓글이 부모댓글의 아이디를 보냄
}
