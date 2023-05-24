package com.booklet.authservice.repository;

import com.booklet.authservice.entity.Hashtag;
import com.booklet.authservice.entity.User;
import com.booklet.authservice.entity.UserHashtag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserHashtagRepository extends JpaRepository<UserHashtag, Long> {
    List<UserHashtag> findAllByUser(User user);
    Boolean existsUserHashtagByUserAndHashtag(User user, Hashtag hashtag);
}
