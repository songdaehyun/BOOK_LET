package com.booklet.bookservice.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter @Setter
@NoArgsConstructor
@Table(name="review")
public class Review extends BaseTimeEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="review_id")
    private Long reviewId;

    @Column
    private String reviewContent;
    @Column
    private float reviewGrade;
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User user;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="book_isbn")
    private Book book;

    @Builder
    public Review(Long reviewId, String reviewContent, float reviewGrade, User user, Book book) {
        this.reviewId = reviewId;
        this.reviewContent = reviewContent;
        this.reviewGrade = reviewGrade;
        this.user = user;
        this.book = book;
    }

    public void updateReview(String reviewContent, float reviewGrade){
        this.reviewContent = reviewContent;
        this.reviewGrade = reviewGrade;
    }
}
