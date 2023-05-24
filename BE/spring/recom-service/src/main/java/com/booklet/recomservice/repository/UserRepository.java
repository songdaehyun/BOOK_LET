package com.booklet.recomservice.repository;

import com.booklet.recomservice.entity.Paragraph;
import com.booklet.recomservice.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
}
