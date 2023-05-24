package com.booklet.authservice.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Setter
@Getter
@Table(name="follow")
public class Follow {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "follow_id")
    private Long followId;

    @ManyToOne
    @JoinColumn(name = "following")  // 팔로우 하는 대상
    private User following;

    @ManyToOne
    @JoinColumn(name = "follower")  // 팔로우 하는 사람
    private User follower;
}
