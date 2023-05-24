package com.booklet.authservice.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ChangeUserInfoReq {
    private String username;
    private String nickname;
    private String email;
}