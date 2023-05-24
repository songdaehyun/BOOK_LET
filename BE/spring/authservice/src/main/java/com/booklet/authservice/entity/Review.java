package com.booklet.authservice.entity;

import lombok.Getter;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Table(name="review")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewId;

    private String reviewContent;

    private Integer reviewGrade;

    @CreationTimestamp
    private LocalDateTime createdDate;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User user;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="book_isbn")
    private Book book;
}
