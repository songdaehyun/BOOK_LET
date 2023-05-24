package com.booklet.authservice.repository;

import com.booklet.authservice.entity.Review;
import com.booklet.authservice.entity.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
//    Slice<Review> findAllByUser(User user, Pageable pageable);
    List<Review> findAllByUser(User user);
}
