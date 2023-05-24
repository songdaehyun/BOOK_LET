package com.booklet.recomservice.repository;

import com.booklet.recomservice.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface BookRepository extends JpaRepository<Book, String> {
    Book findByBookIsbn(String bookIsbn);

    @Query(value = "SELECT * FROM book ORDER BY RAND() LIMIT 1", nativeQuery = true)
    Book findRandomBook();
}
