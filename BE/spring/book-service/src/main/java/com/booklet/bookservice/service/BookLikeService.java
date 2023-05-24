package com.booklet.bookservice.service;

import com.booklet.bookservice.dto.BookLikeReq;
import com.booklet.bookservice.entity.Book;

public interface BookLikeService {
    public boolean findLike(BookLikeReq req);
    public boolean createLike(BookLikeReq req);
    public boolean deleteLike(BookLikeReq req);
    public int countLike(Book book);
}
