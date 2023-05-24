package com.booklet.paragraphservice.controller;

import com.booklet.paragraphservice.dto.paragraph.ParagraphCreateReq;
import com.booklet.paragraphservice.dto.paragraph.ParagraphReq;
import com.booklet.paragraphservice.dto.paragraph.ParagraphUpdateReq;
import com.booklet.paragraphservice.entity.Paragraph;
import com.booklet.paragraphservice.entity.User;
import com.booklet.paragraphservice.service.ParagraphService;
import com.booklet.paragraphservice.service.ParagraphServiceImpl;
import com.booklet.paragraphservice.service.UserService;
import com.booklet.paragraphservice.service.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

import javax.ws.rs.PathParam;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("api/v1/sns/paragraph")
@RequiredArgsConstructor
@Component
public class ParagraphController {
    private final ParagraphService paragraphService;
    private final UserService userService;

    @PostMapping
    public ResponseEntity createParagraph(@RequestBody ParagraphCreateReq request) throws Exception {
        HashMap<String, Object> map = new HashMap<>();
        Long resultId = paragraphService.saveParagraph(request);

        if (resultId != null) {
            map.put("message", "success");
            map.put("id", resultId);
            return new ResponseEntity<>(map, HttpStatus.CREATED);

        } else {
            map.put("message", "fail");
            return new ResponseEntity<>(map, HttpStatus.ACCEPTED);
        }
    }

    @GetMapping("/{paragraphId}")
    public ResponseEntity getOneParagraph(@PathVariable Long paragraphId, @RequestParam Long userId) {
        try {
            Map<String, Object> result = new HashMap<>();
            result = paragraphService.findParagraph(paragraphId, userId);
            if (result == null) {
                String message = "not found";
//                result.put("message", "not found");
                return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
            }
            result.put("message", "success");
            return new ResponseEntity<>(result, HttpStatus.ACCEPTED);

        } catch (Exception e) {
            e.printStackTrace();
            Map<String, Object> result = new HashMap<>();
            result.put("message", "fail");
            return new ResponseEntity(result, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/mylist/{userId}")
    public ResponseEntity getListParagraphs(@PathVariable("userId") Long userId, int page, int size) {
        User user = userService.getUser(userId);
        if (user == null) return new ResponseEntity("not found", HttpStatus.NOT_FOUND);
        HashMap<String, Object> result = new HashMap<>();
        try {
            // page : 요청할 페이지 번호, size : 한 페이지 당 조회 할 개수
            PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "paragraphId"));
            result = paragraphService.findParagraphs(user, pageRequest);
            return new ResponseEntity(result, HttpStatus.ACCEPTED);

        } catch (Exception e) {
            return new ResponseEntity("fail", HttpStatus.BAD_REQUEST);
        }

    }

    @GetMapping("/following/{userId}")
    public ResponseEntity getFollowingParagraph(@PathVariable("userId") Long userId, int page, int size) {
        User user = userService.getUser(userId);
        if (user == null) return new ResponseEntity("not found", HttpStatus.NOT_FOUND);
        try {
            // page : 요청할 페이지 번호, size : 한 페이지 당 조회 할 개수
            PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "paragraphId"));
            HashMap<String, Object> result = paragraphService.findFollowParagraph(user, pageRequest);
            return new ResponseEntity(result, HttpStatus.ACCEPTED);

        } catch (Exception e) {
            return new ResponseEntity("fail", HttpStatus.BAD_REQUEST);

        }
    }

    @PutMapping
    public ResponseEntity modifyParagraph(@RequestBody ParagraphUpdateReq req) {
        Paragraph paragraph = paragraphService.findParagraphEntity(req.getParagraphId());
        HashMap<String, Object> result = new HashMap<>();
        if (paragraph == null) return new ResponseEntity("not found", HttpStatus.NOT_FOUND);
        try {
            paragraph.updateParagraph(req.getParagraphContent(), req.getParagraphColor(), req.getParagraphPage());
            result.put("paragraphId", paragraphService.updateParagraph(paragraph));
            return new ResponseEntity(result, HttpStatus.ACCEPTED);
        } catch (Exception e) {
            return new ResponseEntity("fail", HttpStatus.BAD_REQUEST);

        }
    }

    @DeleteMapping("/{paragraphId}")
    public ResponseEntity deleteParagraph(@PathVariable("paragraphId") Long paragraphId) {
        if(paragraphService.deleteParagraph(paragraphId))  return new ResponseEntity("success", HttpStatus.ACCEPTED);

        return new ResponseEntity("fail", HttpStatus.BAD_REQUEST);
    }
}
