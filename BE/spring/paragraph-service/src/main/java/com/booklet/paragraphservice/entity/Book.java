package com.booklet.paragraphservice.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@Table(name="book")
public class Book {
    @Id
    @Column
    String bookIsbn;

    @Column
    String bookTitle;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="author_id")
    private Author author;
    @Column
    String bookImage;

}
