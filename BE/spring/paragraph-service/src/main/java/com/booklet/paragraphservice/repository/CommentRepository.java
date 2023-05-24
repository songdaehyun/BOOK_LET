package com.booklet.paragraphservice.repository;

import com.booklet.paragraphservice.entity.Comment;
import com.booklet.paragraphservice.entity.Paragraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    @Query("select count(*) from Comment c where c.paragraph.paragraphId = :paragraphId")
    public int countByParagraphId(Long paragraphId);

    @Query("select c from Comment c where c.paragraph=:paragraph order by c.commentGroup")
    public List<Comment> findCommentsByParagraph(Paragraph paragraph);

    @Query("select count(*) from Comment c where c.commentGroup=:commentGroup")
    public int countByCommentGroup(Long commentGroup);

}
