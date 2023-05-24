package com.booklet.bookservice.dto;

import com.booklet.bookservice.entity.Author;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookDto {
    private String bookIsbn;
    private String bookTitle;
    private String bookPublisher;
    private int bookPrice;
    private String bookDescription;
    private float bookGrade;
    private String bookImage;
    private String authorName;
}
