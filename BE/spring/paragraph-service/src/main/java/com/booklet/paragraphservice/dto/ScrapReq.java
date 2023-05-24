package com.booklet.paragraphservice.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ScrapReq {
    private Long paragraphId;
    private Long userId;
}
