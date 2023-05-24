package com.booklet.authservice.controller;

import com.amazonaws.services.s3.model.ObjectMetadata;
import com.booklet.authservice.config.auth.PrincipalDetails;
import com.booklet.authservice.dto.*;
import com.booklet.authservice.entity.User;
import com.booklet.authservice.repository.UserRepository;
import com.booklet.authservice.service.AuthService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity signUp(@RequestBody SignUpReqDto signUpReqDto) {

        HashMap<String, Object> result = new HashMap<>();
        result = authService.signUp(signUpReqDto);

        if (result != null) {
            result.put("message", "success");
            return new ResponseEntity<>(result, HttpStatus.CREATED);

        } else {
            result.put("message", "fail");
            return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping ("/delete/{username}")
    public ResponseEntity deleteUser(@PathVariable String username) {
        HashMap<String, Object> result = new HashMap<>();
        Boolean chk = authService.deleteUser(username);

        if (chk == true) {
            result.put("message", "success");
            return new ResponseEntity<>(result, HttpStatus.OK);

        } else {
            result.put("message", "fail");
            return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/update/{username}")
    public ResponseEntity updateUser(@RequestBody ChangeUserInfoReq changeUserInfoReq, @PathVariable String username) {

        HashMap<String, Object> result = new HashMap<>();
        result = authService.updateUser(changeUserInfoReq, username);

        if (result != null) {
            result.put("message", "success");
            return new ResponseEntity<>(result, HttpStatus.OK);

        } else {
            HashMap<String, Object> failResult = new HashMap<>();
            failResult.put("message", "fail");
            return new ResponseEntity<>(failResult, HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/update/img/{username}")
    public ResponseEntity updateUserImg(@RequestParam("file") MultipartFile file,
                                                @PathVariable String username) {
        HashMap<String, Object> result = new HashMap<>();
        result = authService.saveUserImg(file, username);

        if (result != null) {
            result.put("message", "success");
            return new ResponseEntity<>(result, HttpStatus.OK);

        } else {
            result = new HashMap<>();
            result.put("message", "fail");
            return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/update/img/{username}")
    public ResponseEntity DeleteUserImg(@PathVariable String username) {
        HashMap<String, Object> result = new HashMap<>();

        Boolean bool = authService.deleteUserImg(username);

        if (bool == true) {
            result.put("message", "success");
            return new ResponseEntity<>(result, HttpStatus.OK);

        } else {
            result = new HashMap<>();
            result.put("message", "fail");
            return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
    }



    @GetMapping("user/test")
    public String usertest(Authentication authentication) {
        PrincipalDetails principalDetails = (PrincipalDetails) authentication.getPrincipal();
        System.out.println("test입니다");
        System.out.println(principalDetails.getUsername());
        System.out.println(principalDetails.getUser().getUsername());
        return principalDetails.toString();
    }



    @PostMapping("/setpw")
    public ResponseEntity setPw(Authentication authentication, @RequestBody SetPwReqDto setPwReqDto) {

        HashMap<String, Object> result = new HashMap<>();
        result = authService.setPw(setPwReqDto, authentication);

        if (result != null) {
            result.put("message", "success");
            return new ResponseEntity<>(result, HttpStatus.OK);

        } else {
            HashMap<String, Object> failResult = new HashMap<>();
            failResult.put("message", "fail");
            return new ResponseEntity<>(failResult, HttpStatus.BAD_REQUEST);
        }

    }

    @GetMapping("/check/username/{username}")
    public ResponseEntity<?> checkUsername(@PathVariable String username) {
        HashMap<String, Object> result = new HashMap<>();
        result = authService.checkUsername(username);
        return new ResponseEntity(result, HttpStatus.OK);
    }

    @GetMapping("/check/nickname/{nickname}")
    public ResponseEntity<?> checkNickname(@PathVariable String nickname) {
        HashMap<String, Object> result = new HashMap<>();
        result = authService.checkNickname(nickname);
        return new ResponseEntity(result, HttpStatus.OK);
    }

    @GetMapping("/check/email/{email}")
    public ResponseEntity<?> checkEmail(@PathVariable String email) {
        HashMap<String, Object> result = new HashMap<>();
        result = authService.checkEmail(email);
        return new ResponseEntity(result, HttpStatus.OK);
    }


}
