package com.booklet.authservice.controller;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.booklet.authservice.config.auth.PrincipalDetails;
import com.booklet.authservice.entity.Book;
import com.booklet.authservice.entity.Hashtag;
import com.booklet.authservice.repository.BookRepository;
import com.booklet.authservice.repository.HashtagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Map;

//@RestController
@Controller
@RequestMapping("/test")
@RequiredArgsConstructor
public class TestController {

    public static final String UPLOAD_DIR = "uploads/";
    private final BookRepository bookRepository;

    @GetMapping("/entity")
    public @ResponseBody String tabletest(){
        Book book = bookRepository.findRandomBook();
        System.out.println(book.toString());
        System.out.println(book.getAuthor().toString());
        System.out.println(book.getAuthor().getAuthorName().toString());
        return book.getAuthor().getAuthorName().toString();
    }

    private final AmazonS3Client amazonS3Client;
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @PostMapping("/awsupload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            String fileName = file.getOriginalFilename();
            String fileUrl = "https://" + bucket + "/test" +fileName;
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType(file.getContentType());
            metadata.setContentLength(file.getSize());
            amazonS3Client.putObject(bucket, fileName, file.getInputStream(), metadata);
            return ResponseEntity.ok(fileUrl);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/upload")
    public ResponseEntity<String> handleFileUpload(@RequestParam("file") MultipartFile file) {
        System.out.println(System.getProperty("user.dir"));
        try {
            // 파일 저장 경로 설정
            String UPLOAD_DIRECTORY = System.getProperty("user.dir") + "/uploads/";
            // 파일의 원래 이름
            String fileName = StringUtils.cleanPath(file.getOriginalFilename());
            // 파일 저장 경로와 파일명 결합
            Path targetPath = Paths.get(UPLOAD_DIRECTORY).resolve(fileName);
            // 파일 저장
            Files.copy(file.getInputStream(), targetPath, StandardCopyOption.REPLACE_EXISTING);

            return ResponseEntity.ok("File uploaded successfully: " + fileName);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload file: " + e.getMessage());
        }
    }

    @GetMapping("/images/{filename}")
    public ResponseEntity<?> getImage(@PathVariable("filename") String filename) {
        try {
            // 이미지 파일을 불러옴
            Path imagePath = Paths.get(UPLOAD_DIR, filename);
            byte[] imageBytes = Files.readAllBytes(imagePath);

            // 이미지 바이트 배열을 반환
            return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(imageBytes);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }



    // Tip : JWT를 사용하면 UserDetailsService를 호출하지 않기 때문에 @AuthenticationPrincipal 사용
    // 불가능.
    // 왜냐하면 @AuthenticationPrincipal은 UserDetailsService에서 리턴될 때 만들어지기 때문이다.
//    @GetMapping("/")
//    public ResponseEntity<String> user(Authentication authentication) {
//        PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();
//        return new ResponseEntity<String>(principal.getUsername().toString(), HttpStatus.OK);
//    }
    private final HashtagRepository hashtagRepository;

    @RequestMapping("/")
    public String test1() {
        return "/test.html";
    }

    @RequestMapping("/setdata")
    public @ResponseBody String Data() {
        // hashtag 삽입
        Map<String, Object> word1 = Map.of("name", "공격적인", "p_point", 0.01161, "n_point", 0.0108);
        Map<String, Object> word2 = Map.of("name", "낙천적", "p_point", 0.00066, "n_point", 0.00119);
        Map<String, Object> word3 = Map.of("name", "대담한", "p_point", 0.00237, "n_point", 0.00255);
        Map<String, Object> word4 = Map.of("name", "조심스러운", "p_point", 0.01228, "n_point", 0.01085);
        Map<String, Object> word5 = Map.of("name", "궁금해하는", "p_point", 0.00429, "n_point", 0.00355);
        Map<String, Object> word6 = Map.of("name", "호기로운", "p_point", 0.04288, "n_point", 0.03717);
        Map<String, Object> word7 = Map.of("name", "탐구적인", "p_point", 0.01018, "n_point", 0.00812);
        Map<String, Object> word8 = Map.of("name", "용감한", "p_point", 0.00003, "n_point", 0.00002);
        Map<String, Object> word9 = Map.of("name", "느긋한", "p_point", 0.00001, "n_point", 0);
        Map<String, Object> word10 = Map.of("name", "참신한", "p_point", 0.0004, "n_point", 0.00065);
        Map<String, Object> word11 = Map.of("name", "절제하는", "p_point", 0.00371, "n_point", 0.00398);
        Map<String, Object> word12 = Map.of("name", "완벽한", "p_point", 0.02834, "n_point", 0.02714);
        Map<String, Object> word13 = Map.of("name", "차분히", "p_point", 0.00176, "n_point", 0.00169);
        Map<String, Object> word14 = Map.of("name", "변덕스러운", "p_point", 0.00112, "n_point", 0.00112);
        Map<String, Object> word15 = Map.of("name", "태평한", "p_point", 0.003, "n_point", 0.00243);
        Map<String, Object> word16 = Map.of("name", "까다롭다", "p_point", 0.00222, "n_point", 0.00227);
        Map<String, Object> word17 = Map.of("name", "당차다", "p_point", 0.00133, "n_point", 0.00136);
        Map<String, Object> word18 = Map.of("name", "희생", "p_point", 0.01538, "n_point", 0.01688);
        Map<String, Object> word19 = Map.of("name", "힘차다", "p_point", 0.00273, "n_point", 0.00208);
        Map<String, Object> word20 = Map.of("name", "희망차다", "p_point", 0.00047, "n_point", 0.0005);
        Map<String, Object> word21 = Map.of("name", "활기차다", "p_point", 0.00174, "n_point", 0.0016);
        Map<String, Object> word22 = Map.of("name", "화끈", "p_point", 0.00071, "n_point", 0.00072);
        Map<String, Object> word23 = Map.of("name", "험상궂다", "p_point", 0.00024, "n_point", 0.00019);
        Map<String, Object> word24 = Map.of("name", "허허실실", "p_point", 0.00004, "n_point", 0.00007);
        Map<String, Object> word25 = Map.of("name", "쭈뼛쭈뼛", "p_point", 0.00009, "n_point", 0.00006);
        Map<String, Object> word26 = Map.of("name", "종알종알", "p_point", 0.00028, "n_point", 0.0002);
        Map<String, Object> word27 = Map.of("name", "조용한", "p_point", 0.00005, "n_point", 0.00006);

        List<Map> lst = List.of(
                word1, word2, word3, word4, word5, word6, word7, word8, word9, word10,
                word11, word12, word13, word14, word15, word16, word17, word18, word19, word20,
                word21, word22, word23, word24, word25, word26, word27
        );
        System.out.println(lst.toString());
        for (Map map: lst) {
            System.out.println(map.get("name").toString());

            System.out.println(Float.parseFloat(map.get("p_point").toString()));

            Hashtag hashtag = hashtagRepository.findByHashtagName(map.get("name").toString());
            if (hashtag == null) {
                Hashtag tag = new Hashtag();
                tag.setHashtagName(map.get("name").toString());
                tag.setHashtagPScore(Float.parseFloat(map.get("p_point").toString()));
                tag.setHashtagNScore(Float.parseFloat(map.get("n_point").toString()));
                hashtagRepository.save(tag);
                System.out.println("저장완료! : " + tag.getHashtagName());
            } else {
                System.out.println("이미 존재하여 패스합니다 : " + map.get("name"));
                continue;
            }

        }
        System.out.println("완료!!");
        return "완료!";
    }


}
