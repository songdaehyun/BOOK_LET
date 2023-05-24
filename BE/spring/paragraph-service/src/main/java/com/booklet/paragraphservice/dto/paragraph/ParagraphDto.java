package com.booklet.paragraphservice.dto.paragraph;

import com.booklet.paragraphservice.entity.BaseTimeEntity;
import com.booklet.paragraphservice.entity.Paragraph;
import lombok.*;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ParagraphDto extends BaseTimeEntity{
    private Long paragraphId;
    private String paragraphContent;
    private String paragraphColor;
    private int paragraphPage;
    private Long userId;
    private String bookIsbn;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;
    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public LocalDateTime getModifiedDate() {
        return modifiedDate;
    }
}
