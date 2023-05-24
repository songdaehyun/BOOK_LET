package com.booklet.recomservice.service;

import java.util.HashMap;

public interface RecomService {
    public HashMap<String, Object> getBookCoverRecom(String username, int setting);
    public HashMap<String, Object> getBookRecom(String type, String username, int setting);
    public HashMap<String, Object> getParagraphRecom(String username, int setting);
}