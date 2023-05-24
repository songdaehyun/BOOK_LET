package com.booklet.recomservice.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
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
