package com.booklet.bookservice.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Getter
@NoArgsConstructor
@Table(name="user")
public class User {

    @Id
    @Column(name="user_id")
    Long userId;

    @Column
    String nickname;

}