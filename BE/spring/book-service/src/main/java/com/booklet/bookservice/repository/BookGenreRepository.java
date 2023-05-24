package com.booklet.bookservice.repository;

import com.booklet.bookservice.entity.Book;
import com.booklet.bookservice.entity.BookGenre;
import com.booklet.bookservice.entity.Genre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookGenreRepository extends JpaRepository<BookGenre, Long> {
    public List<Genre> findBookGenreByBook(Book book);
    @Query("select bg.genre.genreName from BookGenre bg where bg.book=:book")
    public List<String> findBookGenreNameByBook(Book book);
}
