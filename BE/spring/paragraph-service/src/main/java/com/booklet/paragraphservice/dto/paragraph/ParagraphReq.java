package com.booklet.paragraphservice.dto.paragraph;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ParagraphReq {
    private Long paragraphId;
    private Long userId;
}
