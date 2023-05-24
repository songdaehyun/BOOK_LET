package com.booklet.bookservice.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@Table(name="book")
public class Book {
    @Id
    private String bookIsbn;

    private String bookTitle;

    private String bookPublisher;

    private int bookPrice;

    private String bookDescription;

    private float bookGrade;
    private float bookLetGrade;

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
    private List<Review> reviews = new ArrayList<>();

    public void updateBookGrade(float newGrade){
        this.bookLetGrade = newGrade;
    }
}
