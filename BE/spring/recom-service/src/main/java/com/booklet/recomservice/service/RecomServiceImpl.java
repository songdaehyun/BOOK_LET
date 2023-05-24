package com.booklet.recomservice.service;

import com.booklet.recomservice.dto.CoverDataDto;
import com.booklet.recomservice.dto.DataDto;
import com.booklet.recomservice.dto.RecomResDto;
import com.booklet.recomservice.dto.paragraph.ParagraphDto;
import com.booklet.recomservice.dto.paragraph.ScrapInfoDto;
import com.booklet.recomservice.dto.paragraph.UserInfoDto;
import com.booklet.recomservice.entity.*;
import com.booklet.recomservice.repository.*;
import com.booklet.recomservice.util.RequestTools;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;


@Slf4j
@Service
@RequiredArgsConstructor
public class RecomServiceImpl implements RecomService{

    private final RequestTools requestTools;

    private final UserRepository userRepository;

    private final BookRepository bookRepository;

    private final BookCoverRepository bookCoverRepository;

    private final ParagraphRepository paragraphRepository;

    private final ScrapRepository scrapRepository;

    private final CommentRepository commentRepository;

    @Override
    public HashMap<String, Object> getBookCoverRecom(String username, int setting) {
        User user = userRepository.findByUsername(username);
        if (user == null) {return null;}
        HashMap<String, Object> result = new HashMap<>();
        ArrayList<RecomResDto> recommend = new ArrayList<>();

        List<BookCover> bookCovers = bookCoverRepository.findAllByUser(user);
        int cnt = 0;
        // 좋아요 누른 녀석이 없다면
        if (bookCovers.size() == 0) {
            log.info("추천 책 커버 정보가 없어 랜덤한 커버로 응답합니다.");
            for (int i = 0; i < 10; i ++) {
                Book book = bookRepository.findRandomBook();
                recommend.add(RecomResDto.builder()
                        .authorName(book.getAuthor().getAuthorName())
                        .bookImgPath(book.getBookImage())
                        .bookIsbn(book.getBookIsbn())
                        .bookTitle(book.getBookTitle())
                        .build());

                if (setting==0 && recommend.size() >= 5) {break;}
            }
            
            result.put("recommendType","bookCover");
            result.put("recommend", recommend);
            return result;
        }
        // 좋아요 누른 녀석이 있다면
        for (BookCover bookCover : bookCovers) {
            CoverDataDto coverDataDto = requestTools.getRecomCover(bookCover.getBookIsbn());

            Book firstBook = bookRepository.findByBookIsbn(coverDataDto.getItem1());
            recommend.add(RecomResDto.builder()
                    .authorName(firstBook.getAuthor().getAuthorName())
                    .bookImgPath(firstBook.getBookImage())
                    .bookIsbn(firstBook.getBookIsbn())
                    .bookTitle(firstBook.getBookTitle())
                    .build());
            if (setting==0 && recommend.size() >= 5) {
                break;
            }
            Book secondBook = bookRepository.findByBookIsbn(coverDataDto.getItem2());
            recommend.add(RecomResDto.builder()
                    .authorName(secondBook.getAuthor().getAuthorName())
                    .bookImgPath(secondBook.getBookImage())
                    .bookIsbn(secondBook.getBookIsbn())
                    .bookTitle(secondBook.getBookTitle())
                    .build());
            if (setting==0 && recommend.size() >= 5) {
                break;
            }
        }

        result.put("recommendType","bookCover");
        result.put("recommend", recommend);
        return result;



    }

    @Override
    public HashMap<String, Object> getBookRecom(String type, String username, int setting) {
        HashMap<String, Object> result = new HashMap<>();
        User user = userRepository.findByUsername(username);
        if (user == null) { log.warn("없는 유저입니다."); return null;}
        System.out.println(user.getNickname().toString());
        System.out.println(user.toString());
        List<String> items = requestTools.getRecombooks(type, user);

        if (items == null) {
            log.info("추천책이 없습니다");return null; }
        // items에서 책 디테일 뽑아서 주기
        List<RecomResDto> data = new ArrayList<>();
        int cnt = 0;
        String genre = "";
        for (String item : items) {
            cnt += 1;
            Book book = bookRepository.findByBookIsbn(item);
            genre = book.getBookGenres().get(0).getGenre().getGenreName();
            if (book == null) {log.info("해당 책이 없습니다."); continue;}
            RecomResDto recomResDto = RecomResDto.builder()
                    .bookIsbn(book.getBookIsbn())
                    .bookTitle(book.getBookTitle())
                    .bookImgPath(book.getBookImage())
                    .authorName(book.getAuthor().getAuthorName())
                    .build();
            if (setting==0 && cnt>3) { break;}
            log.info("등록한 책 : " + recomResDto.toString());
            data.add(recomResDto);
        }
        if (type=="genre") {
            result.put("genreName", genre);
        } else if (type == "score") {
            result.put("nickname", user.getNickname());
        }
        result.put("recommend", data);
        return result;
    }

    @Override
    public HashMap<String, Object> getParagraphRecom(String username, int setting) {
        User user = userRepository.findByUsername(username);
        if (user==null) { return null;}

        List<Long> items = requestTools.getRecomParagraphs(user);
        if(items == null) {
            log.info("추천이 없어 랜덤한 문장을 추천합니다");
            List<Paragraph> parags = paragraphRepository.findAllRandomParagraph(user.getId());
            items = new ArrayList<>();
            for (Paragraph parag : parags) {
                items.add(parag.getParagraphId());
            }
        }

        HashMap<String, Object> result = new HashMap<>();
        List<ParagraphDto> paragraphsDtos = new ArrayList<>();

        int cnt = 0;
        for (Long item: items) {
            cnt += 1;
            Paragraph paragraph = paragraphRepository.findByParagraphId(item);
            User writer = paragraph.getUser();
            // 기본 정보 저장
            UserInfoDto userInfoDto = UserInfoDto.builder()
                    .userId(writer.getId())
                    .nickname(writer.getNickname())
                    .userImage(writer.getUserImage().getImagePath())
                    .build();

            // para list =  [42, 11, 33]
            // scrap 정보 저장
            List<Scrap> scraps = scrapRepository.findAllByParagraph(paragraph);
            List<String> scrapUserImages = new ArrayList<>();
            for(Scrap scrap : scraps) {
                scrapUserImages.add(scrap.getUser().getUserImage().getImagePath());
            }
            int Chkscrap = 0;
            if (scrapRepository.existsByUserAndParagraph(user, paragraph) ==true) {Chkscrap = 1;};

            ScrapInfoDto scrapInfoDto = ScrapInfoDto.builder()
                    .scrapUserImages(scrapUserImages)
                    .scrapCount(scrapRepository.countAllByParagraph(paragraph))
                    .userScrap(Chkscrap)
                    .build();

            paragraphsDtos.add(
                    ParagraphDto.builder()
                            .userInfo(userInfoDto)
                            .bookTitle(paragraph.getBook().getBookTitle())
                            .bookAuthor(paragraph.getBook().getAuthor().getAuthorName())
                            .paragraphId(paragraph.getParagraphId())
                            .paragraphContent(paragraph.getParagraphContent())
                            .paragraphPage(paragraph.getParagraphPage())
                            .paragraphColor(paragraph.getParagraphColor())
                            .createdDate(paragraph.getCreatedDate())
                            .modifiedDate(paragraph.getModifiedDate())
                            .scrapInfo(scrapInfoDto)
                            .commentCnt(commentRepository.countAllByParagraph(paragraph))
                            .build()
            );

            if (setting==0 && cnt >3) {
                break;
            }
        }

        result.put("recommendType", "paragraph");
        result.put("paragraphs", paragraphsDtos);

        return result;
    }

}
