package com.booklet.authservice.repository;

import com.booklet.authservice.entity.BookLikes;
import com.booklet.authservice.entity.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookLikesRepository extends JpaRepository<BookLikes, Long> {
//    Slice<BookLikes> findAllByUser(User user, Pageable pageable);
//    Slice<BookLikes> findAllByUserId(Long userId, Pageable pageable);
    List<BookLikes> findAllByUser(User user);
}
