package com.booklet.recomservice.entity;

import javax.persistence.*;

@Entity
@Table(name="book_likes")
public class BookLikes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookLikeId;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User user;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="book_isbn")
    private Book book;
}
