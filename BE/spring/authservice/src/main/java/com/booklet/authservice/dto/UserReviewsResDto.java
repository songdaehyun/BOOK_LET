package com.booklet.authservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class UserReviewsResDto {
    private Long reviewId;
    private String bookImgPath;
    private String bookTitle;
    private String authorName;
    private String bookPublisher;
    private String bookIsbn;
    private float reviewGrade;
    private String reviewContent;
    private LocalDateTime createdDate;
}
