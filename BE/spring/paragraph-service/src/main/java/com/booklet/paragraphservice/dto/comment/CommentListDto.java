package com.booklet.paragraphservice.dto.comment;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CommentListDto {

    // 댓글 info
    private Long commentId;
    private String commentContent;
    private Long commentGroup;
    private int commentDepth;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;

    // 사용자 info
    private Long userId;
    private String nickname;
    private String userImage;

//    public CommentListDto(Long commentId, String commentContent, LocalDateTime createdDate, LocalDateTime modifiedDate, Long userId, String nickname, String userImage) {
//        this.commentId = commentId;
//        this.commentContent = commentContent;
//        this.createdDate = createdDate;
//        this.modifiedDate = modifiedDate;
//        this.userId = userId;
//        this.nickname = nickname;
//        this.userImage = userImage;
//    }
}
