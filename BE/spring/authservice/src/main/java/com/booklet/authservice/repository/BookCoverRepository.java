package com.booklet.authservice.repository;

import com.booklet.authservice.entity.BookCover;
import com.booklet.authservice.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookCoverRepository extends JpaRepository<BookCover, Long> {
    BookCover findByUser(User user);
    List<BookCover> findAllByUser(User user);
}
