package com.booklet.paragraphservice.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@Table(name="user_image")
public class UserImage {
    @Column
    @Id
    Long userImageId;

    @Column
    String ImagePath;
    @OneToOne
    @JoinColumn(name = "user_id")
    User user;
}
