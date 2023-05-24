package com.booklet.recomservice.dto.paragraph;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserInfoDto {
    private Long userId;
    private String nickname;
    private String userImage;
}
