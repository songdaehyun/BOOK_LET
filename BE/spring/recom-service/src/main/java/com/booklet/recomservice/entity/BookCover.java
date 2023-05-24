package com.booklet.recomservice.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name="book_cover")
public class BookCover {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookCoverId;

    private String bookIsbn;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User user;
}