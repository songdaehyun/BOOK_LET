package com.booklet.recomservice.repository;

import com.booklet.recomservice.entity.Book;
import com.booklet.recomservice.entity.Paragraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ParagraphRepository extends JpaRepository<Paragraph, Long> {
    Paragraph findByParagraphId(Long paragraphId);

    @Query(value = "SELECT * FROM paragraph WHERE user_id != :user_id ORDER BY RAND() LIMIT 10", nativeQuery = true)
    List<Paragraph> findAllRandomParagraph(Long user_id);
}
