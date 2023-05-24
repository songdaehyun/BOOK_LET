package com.booklet.paragraphservice.controller;

import com.booklet.paragraphservice.dto.ScrapReq;
import com.booklet.paragraphservice.dto.paragraph.ParagraphCreateReq;
import com.booklet.paragraphservice.entity.Scrap;
import com.booklet.paragraphservice.entity.User;
import com.booklet.paragraphservice.service.ParagraphService;
import com.booklet.paragraphservice.service.ScrapService;
import com.booklet.paragraphservice.service.ScrapServiceImpl;
import com.booklet.paragraphservice.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@Slf4j
@RestController
@RequestMapping("api/v1/sns/scrap")
@RequiredArgsConstructor
@Component
public class ScrapController {
    private final ScrapService scrapService;
    private final UserService userService;
    private final ParagraphService paragraphService;


    @PostMapping
    public ResponseEntity doScrap(@RequestBody ScrapReq request) throws Exception {
        String result;
        if(scrapService.findScrap(request)){ // 스크랩 존재시 취소 로직
            if(scrapService.deleteScrap(request)){
                result = "cancel";
            }else{
                result = "fail";
            }
        }else{ // 안 했을 시 등록 로직
            if(scrapService.createScrap(request)){
                result = "scrap";
            }else result = "fail";
        }
        return new ResponseEntity<>(result, HttpStatus.ACCEPTED);
    }

    @GetMapping("/{userId}")
    public ResponseEntity getScrapList(@PathVariable Long userId, int page, int size){
        User user = userService.getUser(userId);
        if (user == null) return new ResponseEntity("not found", HttpStatus.NOT_FOUND);
        try {
            // page : 요청할 페이지 번호, size : 한 페이지 당 조회 할 개수
            PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "paragraphId"));
            HashMap<String, Object> result = paragraphService.findScrapParagraph(user, pageRequest);
            return new ResponseEntity(result, HttpStatus.ACCEPTED);

        } catch (Exception e) {
            return new ResponseEntity("fail", HttpStatus.BAD_REQUEST);

        }
    }

    @GetMapping("/count/{userId}")
    public ResponseEntity getScrapCount(@PathVariable Long userId){
        try{
            int count = scrapService.countScrap(userId);
            return new ResponseEntity(count, HttpStatus.ACCEPTED);

        }catch (Exception e){
            return new ResponseEntity("fail", HttpStatus.BAD_REQUEST);
        }
    }
}
