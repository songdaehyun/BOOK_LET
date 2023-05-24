package com.booklet.bookservice.service;

import com.booklet.bookservice.dto.BookDetailRes;
import com.booklet.bookservice.dto.BookListDto;
import com.booklet.bookservice.dto.BookSearchRes;
import com.booklet.bookservice.entity.Book;
import org.springframework.data.domain.Pageable;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public interface BookService {
    public Book findBook(String bookIsbn);
    HashMap<String, Object> searchBooks(String title, Pageable pageable);

    BookDetailRes findBookDetail(String bookIsbn, Long userId);
    HashMap<String, Object> findAuthorBook(Long authorId, Pageable pageable);
}
