package com.booklet.paragraphservice.dto.paragraph;

import com.booklet.paragraphservice.dto.UserDto;
import com.booklet.paragraphservice.entity.Paragraph;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ParagraphCommonListDto {
    //user
    private UserDto userInfo;

    // Paragraph
    private Long paragraphId;
    private String paragraphContent;
    private int paragraphPage;
    private String paragraphColor;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;

    //scrap
    private ParagraphScrapDto scrapInfo;
    // comment
    private int commentCnt;

    // bookInfo
    private String bookIsbn;
    private String bookTitle;
    private String bookAuthor;

    public ParagraphCommonListDto(UserDto user, Paragraph paragraph, ParagraphScrapDto scrapInfo, int commentCnt, String bookIsbn, String bookAuthor, String bookTitle) {
        this.userInfo = user;
        this.paragraphId = paragraph.getParagraphId();
        this.paragraphContent = paragraph.getParagraphContent();
        this.paragraphPage = paragraph.getParagraphPage();
        this.paragraphColor = paragraph.getParagraphColor();
        this.createdDate = paragraph.getCreatedDate();
        this.modifiedDate = paragraph.getModifiedDate();
        this.scrapInfo = scrapInfo;
        this.commentCnt = commentCnt;
        this.bookAuthor = bookAuthor;
        this.bookIsbn = bookIsbn;
        this.bookTitle = bookTitle;
    }

}
