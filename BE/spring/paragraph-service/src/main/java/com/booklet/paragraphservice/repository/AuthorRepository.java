package com.booklet.paragraphservice.repository;

import com.booklet.paragraphservice.entity.Author;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthorRepository extends JpaRepository<Author, Long> {
}
