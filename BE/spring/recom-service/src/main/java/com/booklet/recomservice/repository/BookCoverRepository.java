package com.booklet.recomservice.repository;

import com.booklet.recomservice.entity.BookCover;
import com.booklet.recomservice.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookCoverRepository extends JpaRepository<BookCover, Long> {
    List<BookCover> findAllByUser(User user);
}
