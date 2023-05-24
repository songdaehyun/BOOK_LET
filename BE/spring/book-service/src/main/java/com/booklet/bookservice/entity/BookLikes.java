package com.booklet.bookservice.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@Table(name="book_likes")
public class BookLikes {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookLikeId;
    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "book_isbn")
    private Book book;

    @Builder
    public BookLikes(Long bookLikeId, User user, Book book) {
        this.bookLikeId = bookLikeId;
        this.user = user;
        this.book = book;
    }
}
