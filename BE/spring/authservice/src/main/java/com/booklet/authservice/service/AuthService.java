package com.booklet.authservice.service;

import com.booklet.authservice.dto.*;
import org.springframework.security.core.Authentication;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;

public interface AuthService {
    // 회원가입
    public HashMap<String, Object> signUp(SignUpReqDto signUpReqDto);
    // 회원수정
    public HashMap<String, Object> updateUser(ChangeUserInfoReq changeUserInfoReq, String username);
    // 회원 이미지 설정
    public HashMap<String, Object> saveUserImg(MultipartFile file, String username);
    // 회원 이미지 삭제(기본값 설정)
    public Boolean deleteUserImg(String username);
    // 아이디 중복 확인
    public HashMap<String, Object> checkUsername(String username);
    // 닉네임 중복 확인
    public HashMap<String, Object> checkNickname(String nickname);
    // 이메일 중복 확인
    public HashMap<String, Object> checkEmail(String email);
    // 비밀번호 재설정
    public HashMap<String, Object> setPw(SetPwReqDto setPwReqDto, Authentication authentication);
    // 회원 탈퇴
    public Boolean deleteUser(String username);
}
