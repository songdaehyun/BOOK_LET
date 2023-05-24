package com.booklet.authservice.dto;

import lombok.Data;

@Data
public class LoginReqDto {
    private String username;
    private String password;
}
