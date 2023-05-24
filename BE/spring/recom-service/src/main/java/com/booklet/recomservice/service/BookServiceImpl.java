package com.booklet.recomservice.service;

import com.booklet.recomservice.entity.Book;
import com.booklet.recomservice.repository.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BookServiceImpl implements BookService{

    private final BookRepository bookRepository;

    @Override
    public Book getBook(String isbn) {
        return bookRepository.findByBookIsbn(isbn);
    }
}
