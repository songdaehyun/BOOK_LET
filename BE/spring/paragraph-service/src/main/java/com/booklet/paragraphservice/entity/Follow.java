package com.booklet.paragraphservice.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@Table(name="follow")
public class Follow {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long followId;

    @ManyToOne
    @JoinColumn(name = "following")
    User following;

    @ManyToOne
    @JoinColumn(name = "follower")
    User follower;

}
