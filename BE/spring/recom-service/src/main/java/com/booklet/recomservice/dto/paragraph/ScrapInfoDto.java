package com.booklet.recomservice.dto.paragraph;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ScrapInfoDto {
    private List<String> scrapUserImages;
    private int scrapCount;
    private int userScrap;
}
