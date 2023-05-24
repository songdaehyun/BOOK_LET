package com.booklet.recomservice.entity;

import lombok.Setter;

import javax.persistence.*;

@Entity
@Setter
@Table(name="follow")
public class Follow {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long followId;

    @ManyToOne
    @JoinColumn(name = "following")  // 팔로우 하는 대상
    private User following;

    @ManyToOne
    @JoinColumn(name = "follower")  // 팔로우 하는 사람
    private User follower;
}
