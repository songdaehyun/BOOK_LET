package com.booklet.recomservice.dto.paragraph;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ParagraphDto {
    private UserInfoDto userInfo;
    private String bookAuthor;
    private String bookTitle;
    private Long paragraphId;
    private String paragraphContent;
    private int paragraphPage;
    private String paragraphColor;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;
    private ScrapInfoDto scrapInfo;
    private int commentCnt;
}
