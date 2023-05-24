package com.booklet.bookservice.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
public class BookListDto {
    private String bookTitle;
    private String bookIsbn;
    private String authorName;
    private String bookImage;

    public BookListDto(String bookTitle, String bookIsbn, String authorName, String bookImage) {
        this.bookTitle = bookTitle;
        this.bookIsbn = bookIsbn;
        this.authorName = authorName;
        this.bookImage = bookImage;
    }
}
