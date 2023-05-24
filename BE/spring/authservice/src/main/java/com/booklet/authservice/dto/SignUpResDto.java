package com.booklet.authservice.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class SignUpResDto {
    private String username;
    private String nickname;
    private String email;
}
