package com.booklet.bookservice.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private Long userId;
    private String nickname;
    private String userImage; // 보류
}
