package com.booklet.recomservice.repository;

import com.booklet.recomservice.entity.Comment;
import com.booklet.recomservice.entity.Paragraph;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    Integer countAllByParagraph(Paragraph paragraph);
}
