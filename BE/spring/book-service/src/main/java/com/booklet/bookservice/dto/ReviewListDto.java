package com.booklet.bookservice.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
public class ReviewListDto {
    private UserDto userInfo;
    private Long reviewId;
    private String reviewContent;
    private double reviewGrade;
    private LocalDateTime createdDate;

    @Builder
    public ReviewListDto(UserDto userInfo,Long reviewId, String reviewContent, double reviewGrade, LocalDateTime createdDate) {
        this.userInfo = userInfo;
        this.reviewId = reviewId;
        this.reviewContent = reviewContent;
        this.createdDate = createdDate;
        this.reviewGrade = reviewGrade;
    }
}
