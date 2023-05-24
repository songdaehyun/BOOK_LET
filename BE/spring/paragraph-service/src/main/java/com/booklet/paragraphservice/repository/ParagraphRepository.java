package com.booklet.paragraphservice.repository;

import com.booklet.paragraphservice.entity.Paragraph;
import com.booklet.paragraphservice.entity.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ParagraphRepository extends JpaRepository<Paragraph, Long> {
    Slice<Paragraph> findParagraphByUser(User user,Pageable pageable);

    @Query("select p from Paragraph p inner join Follow f " +
            "on p.user.userId=f.following.userId " +
            "where f.follower=:user")
    Slice<Paragraph> findParagraphJoinFollow(User user, Pageable pageable);

    @Query("select p from Paragraph p inner join Scrap sc " +
            "on p.paragraphId=sc.paragraph.paragraphId " +
            "where sc.user=:user order by sc.scrapId desc ")
    Slice<Paragraph> findParagraphJoinScrap(User user, Pageable pageable);
}
