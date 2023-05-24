package com.booklet.recomservice.entity;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
@Table(name="book_genre")
public class BookGenre {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookGenreId;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="genre_id")
    private Genre genre;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="book_isbn")
    private Book book;
}
