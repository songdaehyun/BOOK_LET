package com.booklet.paragraphservice.service;

import com.booklet.paragraphservice.dto.ScrapReq;
import com.booklet.paragraphservice.dto.UserDto;
import com.booklet.paragraphservice.entity.Paragraph;
import com.booklet.paragraphservice.entity.User;

public interface ScrapService {
    public boolean findScrap(ScrapReq req);
    public boolean createScrap(ScrapReq req); // 스크랩 등록
    public boolean deleteScrap(ScrapReq req); //스크랩 취소
    //스크랩 카운트 수
    public int countScrap(Long userId);
}
