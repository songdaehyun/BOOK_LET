package com.booklet.authservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResDto {
    private String username;
    private String nickname;
}
