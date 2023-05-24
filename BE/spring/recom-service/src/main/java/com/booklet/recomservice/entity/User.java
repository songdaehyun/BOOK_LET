package com.booklet.recomservice.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="user")
@Getter
@Setter
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    @Column(unique = true, length = 12)
    private String username;

    private String password;

    private String role;

    @CreationTimestamp
    private LocalDateTime createdDate;

    @Column(unique = true)
    private String email;

    @Column(unique = true, length = 12)
    private String nickname;

    private Integer type;

    private Integer age;

    private Integer sex;

    private float preferScore;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private UserImage userImage;

    @OneToMany(mappedBy = "user")
    private List<UserHashtag> userHashtags = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<BookLikes> bookLikes = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Comment> comments = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Paragraph> paragraphs = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Review> reviews = new ArrayList<>();

    @OneToMany(mappedBy = "user") //FK 없는 쪽에 mapped by 리더
    private List<Scrap> scraps = new ArrayList<>();

}