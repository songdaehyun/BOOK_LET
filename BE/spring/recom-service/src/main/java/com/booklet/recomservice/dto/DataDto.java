package com.booklet.recomservice.dto;

import lombok.Data;

import java.util.ArrayList;

@Data
public class DataDto {
    private ArrayList<String> recom_list;
    private Boolean result;
}
