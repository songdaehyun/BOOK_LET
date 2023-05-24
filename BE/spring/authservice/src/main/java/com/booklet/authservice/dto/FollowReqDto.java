package com.booklet.authservice.dto;

import lombok.Data;

@Data
public class FollowReqDto {
    private String username;
    private String followingUsername;
}
