package com.booklet.authservice.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.booklet.authservice.config.auth.PrincipalDetails;
import com.booklet.authservice.dto.*;
import com.booklet.authservice.entity.User;
import com.booklet.authservice.entity.UserImage;
import com.booklet.authservice.repository.UserImageRepository;
import com.booklet.authservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.HashMap;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService{

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private PrincipalDetails principalDetails;
    private final UserImageRepository userImageRepository;

//    public static final String UPLOAD_DIR = "uploads/";
    private final AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;


    @Override
    public HashMap<String, Object> signUp(SignUpReqDto signUpReqDto) {
        try {
            signUpReqDto.setPassword(bCryptPasswordEncoder.encode(signUpReqDto.getPassword()));
            HashMap<String, Object> result = new HashMap<>();
            ModelMapper modelMapper = new ModelMapper();
            modelMapper.getConfiguration().setAmbiguityIgnored(true);
            User user = modelMapper.map(signUpReqDto, User.class);
            user.setRole("ROLE_USER");
            userRepository.save(user);
            UserImage userImage = new UserImage();
            userImage.setUser(user);
            userImage.setModifiedDate(LocalDateTime.now());
            userImage.setImagePath("https://pjbooklet.s3.ap-northeast-2.amazonaws.com/defaultImg.png");
            userImageRepository.save(userImage);


            SignUpResDto signUpResDto = modelMapper.map(user, SignUpResDto.class);

            result.put("data", signUpResDto);
            return result;

        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;

    }

    @Override
    public HashMap<String, Object> updateUser(ChangeUserInfoReq changeUserInfoReq, String username) {
        try {
            HashMap<String, Object> result = new HashMap<>();
            User user = userRepository.findByUsername(username);
            if (user==null) {return null;}
            user.setUsername(changeUserInfoReq.getUsername());
            user.setNickname(changeUserInfoReq.getNickname());
            user.setEmail(changeUserInfoReq.getEmail());
            userRepository.save(user);

            result.put("data", changeUserInfoReq);
            log.info("회원정보 수정 완료 : "+user.getUsername());
            return result;

        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;

    }

    @Override
    public HashMap<String, Object> saveUserImg(MultipartFile file, String username) {
        log.info("유저 프로필 이미지 저장 진입 : "+username);
        User user = userRepository.findByUsername(username);
        if (user==null) {
            log.warn("없는 유저 입니다" + user.toString());
            return null;
        }
        HashMap<String, Object> result = new HashMap<>();
        System.out.println("ㅇㅁㅇ!!!!!!");
        try {
            UserImage userImage = userImageRepository.findByUser(user);
            System.out.println("ㅇㅅㅇ");
            if (userImage == null) {
                userImage = new UserImage();
            }
            String fileName = file.getOriginalFilename();
            String fileUrl = "https://" + bucket + "/test" +fileName;
            String userUrl = "https://pjbooklet.s3.ap-northeast-2.amazonaws.com/" + fileName;
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType(file.getContentType());
            metadata.setContentLength(file.getSize());
            userImage.setImagePath(userUrl);
            userImage.setModifiedDate(LocalDateTime.now());
            userImage.setUser(user);
            System.out.println("ㅇㅁㅇ");
//            userImage.setImgId(0L); // 먼지 모르겠지만 오류 방지용으로 집어넣음
            userImageRepository.save(userImage);
            amazonS3Client.putObject(bucket, fileName, file.getInputStream(), metadata);
            log.info("유저 이미지 저장 완료! : " + userUrl);
            HashMap<String, Object> items = new HashMap<>();
            items.put("userImg", userUrl);
            result.put("data", items);

            return result;
        } catch (IOException e) {
            System.out.println("ㅇㅁㅇ");
            log.info("유저 이미지 저장 실패 : ", user.getUsername());
            e.printStackTrace();
            return null;}
    }

    @Override
    public Boolean deleteUserImg(String username) {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            return false;
        }
        user.getUserImage().setImagePath("https://pjbooklet.s3.ap-northeast-2.amazonaws.com/defaultImg.png");
        user.getUserImage().setModifiedDate(LocalDateTime.now());
        userRepository.save(user);
        log.info("유저 기본 이미지로 변경" + user.getUserImage().getImagePath());
        return true;
    }

    @Override
    public HashMap<String, Object> checkUsername(String username) {
        HashMap<String, Object> result = new HashMap<>();
        User user = userRepository.findByUsername(username);
        if (user == null) {
            result.put("message", "available");
        } else {
            result.put("message", "duplicate");
        }
        return result;
    }

    @Override
    public HashMap<String, Object> checkNickname(String nickname) {
        HashMap<String, Object> result = new HashMap<>();
        User user = userRepository.findByNickname(nickname);
        if (user == null) {
            result.put("message", "available");
        } else {
            result.put("message", "duplicate");
        }
        return result;
    }

    @Override
    public HashMap<String, Object> checkEmail(String email) {
        HashMap<String, Object> result = new HashMap<>();
        User user = userRepository.findByEmail(email);
        if (user == null) {
            result.put("message", "available");
        } else {
            result.put("message", "duplicate");
        }
        return result;
    }

    @Override
    public HashMap<String, Object> setPw(SetPwReqDto setPwReqDto, Authentication authentication) {
        System.out.println("비밀번호 변경요청 옴!");
        System.out.println(setPwReqDto.toString());
        HashMap result = new HashMap();
        PrincipalDetails principalDetails =  (PrincipalDetails) authentication.getPrincipal();
        User user = principalDetails.getUser();
        System.out.println(user.getUsername());
        System.out.println(bCryptPasswordEncoder.matches(setPwReqDto.getPassword(), user.getPassword()));
        if (bCryptPasswordEncoder.matches(setPwReqDto.getPassword(), user.getPassword())==true) {
            System.out.println("같네용");
            user.setPassword(bCryptPasswordEncoder.encode(setPwReqDto.getNewPassword()));
            userRepository.save(user);
            result.put("data", true);
            return result;
        } else {
            System.out.println("다릅니당");
            return null;
       }

    }

    @Override
    public Boolean deleteUser(String username) {
        User user = userRepository.findByUsername(username);
        if (user==null) {return false;}
        userRepository.delete(user);
        return true;
    }
}