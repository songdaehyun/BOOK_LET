package com.booklet.recomservice.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
@Table(name="scrap")
public class Scrap {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long scrapId;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @JsonBackReference
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "paragraph_id")
    private Paragraph paragraph;
}
