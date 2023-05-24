package com.booklet.authservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GetUserInfoResDto {
    private String imgPath;
    private String nickname;
    private Integer follower;
    private Integer following;
    private String email;
}
