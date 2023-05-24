package com.booklet.recomservice.entity;

import lombok.Getter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Table(name="paragraph")
public class Paragraph extends BaseTimeEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="paragraph_id")
    private Long paragraphId;

    @Column(length = 301, nullable = false)
    private String paragraphContent;

    @Column
    private String paragraphColor;

    @Column
    private int paragraphPage;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="book_isbn")
    private Book book;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User user;

    @OneToMany(mappedBy = "paragraph") //FK 없는 쪽에 mapped by 리더
    private List<Comment> comments = new ArrayList<>();

    @OneToMany(mappedBy = "paragraph") //FK 없는 쪽에 mapped by 리더
    private List<Scrap> scraps = new ArrayList<>();

}
