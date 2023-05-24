package com.booklet.recomservice.entity;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
@Table(name="user_image")
public class UserImage extends BaseTimeEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userImageId;

    @Column
    private String imagePath;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
}
