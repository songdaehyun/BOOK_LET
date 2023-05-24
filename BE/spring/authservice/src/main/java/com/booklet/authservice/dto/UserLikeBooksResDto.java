package com.booklet.authservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserLikeBooksResDto {
    private String bookIsbn;
    private String bookImgPath;
    private String bookTitle;
    private String authorName;
}
