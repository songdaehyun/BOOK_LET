package com.booklet.recomservice.dto;

import lombok.Data;

import java.util.ArrayList;

@Data
public class SentenceDto {
    private ArrayList<Long> recom_list;
    private Boolean result;
}
