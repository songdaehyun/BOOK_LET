package com.booklet.authservice.repository;

import com.booklet.authservice.entity.Hashtag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HashtagRepository extends JpaRepository<Hashtag, Long> {
    Hashtag findByHashtagName(String name);
    List<Hashtag> findAll();
}
