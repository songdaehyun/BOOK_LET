package com.booklet.bookservice.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookLikeReq {
    private String bookIsbn;
    private Long userId;
}
