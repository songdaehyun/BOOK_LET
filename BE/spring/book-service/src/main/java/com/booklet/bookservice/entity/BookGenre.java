package com.booklet.bookservice.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
@Getter
@NoArgsConstructor
@Entity
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
