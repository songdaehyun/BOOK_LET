package com.booklet.authservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginDataDto {
    private String username;
    private String nickname;
    private String token;
}
