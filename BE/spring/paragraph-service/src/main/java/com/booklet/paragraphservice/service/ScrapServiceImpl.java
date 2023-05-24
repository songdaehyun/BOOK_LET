package com.booklet.paragraphservice.service;

import com.booklet.paragraphservice.dto.ScrapReq;
import com.booklet.paragraphservice.dto.UserDto;
import com.booklet.paragraphservice.dto.paragraph.ParagraphDto;
import com.booklet.paragraphservice.entity.Paragraph;
import com.booklet.paragraphservice.entity.Scrap;
import com.booklet.paragraphservice.entity.User;
import com.booklet.paragraphservice.repository.ParagraphRepository;
import com.booklet.paragraphservice.repository.ScrapRepository;
import com.booklet.paragraphservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class ScrapServiceImpl implements ScrapService{

    private final ScrapRepository scrapRepository;
    private final ParagraphRepository paragraphRepository;
    private final UserRepository userRepository;

    @Override
    public boolean findScrap(ScrapReq req) {
        Scrap scrap = scrapRepository.findByUserIdAndParagraphId(req.getUserId(), req.getParagraphId()).orElse(null);
        if(scrap != null) return true;
        return false;
    }


    @Transactional
    @Override
    public boolean createScrap(ScrapReq req) {
        try {
            Paragraph paragraph = paragraphRepository.findById(req.getParagraphId()).orElse(null);
            User user = userRepository.findById(req.getUserId()).orElse(null);
            // 문장 정보
            Scrap scrap = Scrap.builder().paragraph(paragraph).user(user)
                            .build();
            scrapRepository.save(scrap);
        }catch (Exception e){
            e.printStackTrace();
            return false;
        }
        return true;
    }

    @Transactional
    @Override
    public boolean deleteScrap(ScrapReq req) {
        try{
//            Paragraph paragraph = paragraphRepository.findById(req.getParagraphId()).orElse(null);
//            User user = userRepository.findById(req.getUserId()).orElse(null);
            Scrap s = scrapRepository.findByUserIdAndParagraphId(req.getUserId(), req.getParagraphId()).orElse(null);
            // 문장 정보
            Scrap scrap = Scrap.builder().paragraph(s.getParagraph()).user(s.getUser()).scrapId(s.getScrapId())
                    .build();
            scrapRepository.delete(scrap);
        }catch (Exception e){
            e.printStackTrace();
            return false;
        }
        return true;
    }

    @Override
    public int countScrap(Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        if(user==null) return 0;
        return scrapRepository.countByUser(user);
    }

}
