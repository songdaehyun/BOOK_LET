package com.booklet.authservice.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name="user_hashtag")
@Data
public class UserHashtag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userHashtagId;

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name="hashtag_id")
    private Hashtag hashtag;
}