package com.booklet.paragraphservice.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Getter
@NoArgsConstructor
@Table(name="author")
public class Author {
    @Id
    private Long authorId;
    @Column
    private String authorName;
}
