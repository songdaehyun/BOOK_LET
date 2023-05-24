package com.booklet.authservice.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;

@Entity
@Table(name="comment")
public class Comment extends BaseTimeEntity {
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

}
