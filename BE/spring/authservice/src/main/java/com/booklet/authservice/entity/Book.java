package com.booklet.authservice.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Table(name = "book")
public class Book {
    @Id
    private String bookIsbn;

    private String bookTitle;

    private String bookPublisher;

    private Integer bookPrice;

    private String bookDescription;

    private Float bookGrade;

    @Column
    private String bookImage;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="author_id")
    private Author author;

    @OneToMany(mappedBy = "book", cascade = CascadeType.ALL)
    private List<BookGenre> bookGenres = new ArrayList<>();

    @OneToMany(mappedBy = "book", cascade = CascadeType.ALL)
    private List<BookLikes> bookLikes = new ArrayList<>();

    @OneToMany(mappedBy = "book", cascade = CascadeType.ALL)
    private List<Paragraph> paragraphs = new ArrayList<>();

    @OneToMany(mappedBy = "book", cascade = CascadeType.ALL)
    private List<Review> reviews = new ArrayList<>();
}
