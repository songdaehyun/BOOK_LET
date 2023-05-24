package com.booklet.paragraphservice.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Fetch;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Getter
@NoArgsConstructor
@Table(name="comment")
public class Comment extends BaseTimeEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private Long commentId;
    @Column(nullable = false)
    private Long commentGroup; // 댓글이 속한 그룹 ( 모댓글의 commentsID )
    @Column(nullable = false)
    private int commentDepth; // 0 : 모댓글, 1 : 자식
    @Column(nullable = false)
    private String commentContent;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "paragraph_id")
    private Paragraph paragraph;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Builder
    public Comment( Long commentGroup, int commentDepth, String commentContent, Paragraph paragraph, User user) {
//        this.commentId = commentId;
        this.commentGroup = commentGroup;
        this.commentDepth = commentDepth;
        this.commentContent = commentContent;
        this.paragraph = paragraph;
        this.user = user;
    }

    public void updateCommentUpdate(String commentContent){
        this.commentContent = commentContent;
    }
    public void updateCommentGroup(){
        this.commentGroup = this.commentId;
    }
}
