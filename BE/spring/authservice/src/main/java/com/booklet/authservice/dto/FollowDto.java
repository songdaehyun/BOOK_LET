package com.booklet.authservice.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FollowDto {
    private String username;
    private String nickname;
    private String userImg;
}
