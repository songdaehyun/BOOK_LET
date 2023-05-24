package com.booklet.recomservice.repository;

import com.booklet.recomservice.entity.Paragraph;
import com.booklet.recomservice.entity.Scrap;
import com.booklet.recomservice.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ScrapRepository extends JpaRepository<Scrap, Long> {
    Integer countAllByParagraph(Paragraph paragraph);
    List<Scrap> findAllByParagraph(Paragraph paragraph);
    Boolean existsByUserAndParagraph(User user, Paragraph paragraph);

}
