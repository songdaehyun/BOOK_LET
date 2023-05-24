package com.booklet.authservice.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="hashtag")
@Data
public class Hashtag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long hashtagId;

    private String hashtagName;

    @Column(name = "hashtag_p_score")
    private float hashtagPScore;

    @Column(name = "hashtag_n_score")
    private float hashtagNScore;

    @OneToMany(mappedBy = "hashtag")
    private List<UserHashtag> userHashtags = new ArrayList<>();

}
