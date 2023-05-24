package com.booklet.bookservice.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookDetailRes {
    private String bookIsbn;
    private String bookTitle;
    private String bookPublisher;
    private int bookPrice;
    private String bookDescription;
    private float bookGrade;
    private String bookImage;
    private List<String> GenreNames;
    private String authorName;
    private Long authorId;
    private List<AuthorBookDto> authorOtherBooks;
    // 좋아요 여부
    private boolean bookLike;
    //좋아요 수 
    private int likesNumber;
    // 좋아요 한 유저들의 사진 리스트
    private List<String> likesUserImages;
    private boolean reviewed;

    public void setBookLike(boolean flag){
        this.bookLike = flag;
    }
    public void setIsReview(boolean flag){this.reviewed = flag;}
}
