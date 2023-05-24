package com.booklet.paragraphservice.dto.comment;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CommentUpdateReq {
    private Long commentId;
    private String commentContent;
}
