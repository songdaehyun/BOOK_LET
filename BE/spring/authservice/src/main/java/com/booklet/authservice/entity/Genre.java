package com.booklet.authservice.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="genre")
public class Genre {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long genreId;

    private String genreName;

    @JsonIgnore
    @OneToMany(mappedBy = "genre", cascade = CascadeType.ALL)
    private List<BookGenre> bookGenres = new ArrayList<>();
}
