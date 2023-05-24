package com.booklet.paragraphservice.dto.paragraph;

import lombok.*;

import java.util.ArrayList;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ParagraphScrapDto {
    private ArrayList<String> scrapUserImages;
    private int scrapCount;
    private int userScrap; // 사용자가 스크랩한지 안한지 여부
}
