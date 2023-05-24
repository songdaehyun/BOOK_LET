package com.booklet.authservice.dto;

import lombok.Data;

@Data
public class SetPwReqDto {
    private String newPassword;
    private String password;
}
