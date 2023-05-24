package com.booklet.authservice.config.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.booklet.authservice.config.auth.PrincipalDetails;
import com.booklet.authservice.dto.LoginReqDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;

@Slf4j
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter{

    private final AuthenticationManager authenticationManager;

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
            throws AuthenticationException {

        log.info("JwtAuthenticationFilter : 진입");

        ObjectMapper om = new ObjectMapper();
        LoginReqDto LoginReqDto = null;
        try {
            LoginReqDto = om.readValue(request.getInputStream(), LoginReqDto.class);
        } catch (Exception e) {
            e.printStackTrace();
        }

        log.info("JwtAuthenticationFilter : {}", LoginReqDto);

        // 유저네임패스워드 토큰 생성
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(
                        LoginReqDto.getUsername(),
                        LoginReqDto.getPassword());

        log.info("JwtAuthenticationFilter : 토큰생성완료");

        Authentication authentication =
                authenticationManager.authenticate(authenticationToken);

        PrincipalDetails principalDetailis = (PrincipalDetails) authentication.getPrincipal();
        log.info("Authentication : {}",principalDetailis.getUser().getUsername());
        return authentication;
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
                                            Authentication authResult) throws IOException, ServletException {

        PrincipalDetails principalDetailis = (PrincipalDetails) authResult.getPrincipal();

        String jwtToken = JWT.create()
                .withSubject(principalDetailis.getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis()+JwtProperties.EXPIRATION_TIME))
                .withClaim("userId", principalDetailis.getUser().getId())
                .withClaim("username", principalDetailis.getUser().getUsername())
                .sign(Algorithm.HMAC512(JwtProperties.SECRET));

        response.addHeader(JwtProperties.HEADER_STRING, JwtProperties.TOKEN_PREFIX+jwtToken);
//        response.setHeader(JwtProperties.HEADER_STRING, JwtProperties.TOKEN_PREFIX+jwtToken);
    }

}
