package com.booklet.bookservice.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthorBookDto {
    private String bookImage;
    private String bookTitle;
    private String bookIsbn;
}
