package com.booklet.bookservice.repository;

import com.booklet.bookservice.entity.Book;
import com.booklet.bookservice.entity.BookLikes;
import com.booklet.bookservice.entity.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookLikesRepository extends JpaRepository<BookLikes, Long> {
    @Query("select bl from BookLikes bl where bl.book.bookIsbn=:bookIsbn and bl.user.userId=:userId")
    public Optional<BookLikes> findByUserIdAndParagraphId(Long userId, String bookIsbn);
    public int countBookLikesByBook(Book book);
    @Query("select bl.user from BookLikes bl where bl.book.bookIsbn = :bookIsbn")
    public List<User> findTop3BookLikeUser(String bookIsbn, Pageable pageable);

}
