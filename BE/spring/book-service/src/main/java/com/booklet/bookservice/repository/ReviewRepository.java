package com.booklet.bookservice.repository;

import com.booklet.bookservice.entity.Book;
import com.booklet.bookservice.entity.Review;
import com.booklet.bookservice.entity.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    Slice<Review> findReviewByBook(Book book, Pageable pageable);
    int countByBook(Book book);
    Optional<Review> findReviewByUserAndBook(User user, Book book);

}

