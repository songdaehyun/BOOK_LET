package com.booklet.authservice.config.jwt;

public interface JwtProperties {
    String SECRET = "75c4f5cda3d473b96277575d34ca5c670c003e59cecc8b0a1e5a97bfd9a0fd7f81b1e679fd338a58dea792b817092e509d54888496f52a4dd11719184d380d94";
    int EXPIRATION_TIME = 60000 * 60 * 10; // 10분 (1/1000초)
    String TOKEN_PREFIX = "Bearer ";
    String HEADER_STRING = "Authorization";
}
