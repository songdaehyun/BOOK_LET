package com.booklet.recomservice.entity;

import lombok.Getter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="hashtag")
@Getter
public class Hashtag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long hashtagId;

    private String hashtagName;

    @OneToMany(mappedBy = "hashtag")
    private List<UserHashtag> userHashtags = new ArrayList<>();

}
