package com.booklet.bookservice.repository;

import com.booklet.bookservice.dto.AuthorBookDto;
import com.booklet.bookservice.dto.BookListDto;
import com.booklet.bookservice.dto.BookSearchRes;
import com.booklet.bookservice.entity.Author;
import com.booklet.bookservice.entity.Book;
import org.apache.commons.lang.text.StrTokenizer;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, String> {

     Slice<Book> findByBookTitleContaining(String title, Pageable pageable);
     @Query("select new com.booklet.bookservice.dto.AuthorBookDto(b.bookImage, b.bookTitle, b.bookIsbn) from Book b where b.author=:author and b.bookIsbn!=:bookIsbn")
     List<AuthorBookDto> findBooksByAuthor(String bookIsbn, Author author, Pageable pageable);
     @Query("select new com.booklet.bookservice.dto.AuthorBookDto(b.bookImage, b.bookTitle, b.bookIsbn) from Book b where b.bookPublisher=:publisher")
     List<AuthorBookDto> findTop5BooksByBookPublisher(String publisher, Pageable pageable);
     Slice<Book> findBooksByAuthor(Author author, Pageable pageable);

}
