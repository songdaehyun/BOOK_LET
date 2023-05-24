package com.booklet.bookservice.repository;

import com.booklet.bookservice.entity.Author;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthorRepository extends JpaRepository<Author, Long> {
}
