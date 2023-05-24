package com.booklet.paragraphservice.dto.paragraph;

import lombok.*;

@Getter @Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ParagraphCreateReq {
    private Long userId;
    private String bookIsbn;
    private String paragraphContent;
    private int paragraphPage;
    private String paragraphColor;

}
