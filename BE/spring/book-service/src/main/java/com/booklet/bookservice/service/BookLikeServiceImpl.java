package com.booklet.bookservice.service;

import com.booklet.bookservice.dto.BookLikeReq;
import com.booklet.bookservice.entity.Book;
import com.booklet.bookservice.entity.User;
import com.booklet.bookservice.entity.BookLikes;
import com.booklet.bookservice.repository.BookLikesRepository;
import com.booklet.bookservice.repository.BookRepository;
import com.booklet.bookservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class BookLikeServiceImpl implements BookLikeService {
    private final BookLikesRepository bookLikesRepository;
    private final BookRepository bookRepository;
    private final UserRepository userRepository;

    @Override
    public boolean findLike(BookLikeReq req) {
        BookLikes bookLikes = bookLikesRepository.findByUserIdAndParagraphId(req.getUserId(), req.getBookIsbn()).orElseGet(BookLikes::new);
        if (bookLikes.getBookLikeId() == null) {
            return false;
        }
        return true;
    }

    @Transactional
    @Override
    public boolean createLike(BookLikeReq req) {
        try {
            Book book = bookRepository.findById(req.getBookIsbn()).orElseGet(Book::new);
            User user = userRepository.findById(req.getUserId()).orElseGet(User::new);
            if (book.getBookIsbn() == null || user.getUserId() == null) {
                return false;
            }
            BookLikes bookLikes = BookLikes.builder()
                    .book(book).user(user).build();
            bookLikesRepository.save(bookLikes);
        } catch (Exception e) {
            return false;
        }
        return true;
    }
    @Transactional
    @Override
    public boolean deleteLike(BookLikeReq req) {
        try {
            BookLikes bookLikes = bookLikesRepository.findByUserIdAndParagraphId(req.getUserId(), req.getBookIsbn()).orElseGet(BookLikes::new);
            if(bookLikes.getBookLikeId()==null) return false;
            bookLikesRepository.delete(bookLikes);
        } catch (Exception e) {
            return false;
        }
        return true;
    }
    @Override
    public int countLike(Book book) {
        return 0;
    }
}
