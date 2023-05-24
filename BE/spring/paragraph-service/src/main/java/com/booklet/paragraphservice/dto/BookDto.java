package com.booklet.paragraphservice.dto;

import lombok.*;

@Getter @Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookDto {
    private String bookIsbn;
    private String bookTitle;
    private String bookAuthor;
    private String bookImage;
}
