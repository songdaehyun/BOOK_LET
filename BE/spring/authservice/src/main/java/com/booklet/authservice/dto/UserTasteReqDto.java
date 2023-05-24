package com.booklet.authservice.dto;

import lombok.Data;

import java.util.List;

@Data
public class UserTasteReqDto {
    private List<String> tastes;
    private List<String> bookCovers;
}
