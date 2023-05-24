package com.booklet.bookservice.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReviewDto {
    private String content;
    private Long grade;
    private String bookIsbn;
    private Long userId;
}
