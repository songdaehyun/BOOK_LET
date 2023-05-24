package com.booklet.paragraphservice.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
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

    @Builder
    public Scrap(Long scrapId, User user, Paragraph paragraph) {
        this.scrapId = scrapId;
        this.user = user;
        this.paragraph = paragraph;
    }
}
