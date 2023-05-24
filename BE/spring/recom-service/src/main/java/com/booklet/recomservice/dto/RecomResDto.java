package com.booklet.recomservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecomResDto {
    private String bookImgPath;
    private String bookTitle;
    private String authorName;
    private String bookIsbn;
}
