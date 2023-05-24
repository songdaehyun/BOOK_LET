package com.booklet.paragraphservice.dto.paragraph;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ParagraphUpdateReq {
    private Long paragraphId;
    private String paragraphContent;
    private String paragraphColor;
    private int paragraphPage;
}
