package com.booklet.authservice.config;

import com.booklet.authservice.config.jwt.JwtProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;

@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        List<String> originlst = new ArrayList<>(List.of(
                "http://localhost:3000",
                "https://localhost:3000",
                "http://j8b306.p.ssafy.io:3000",
                "https://j8b306.p.ssafy.io:3000",
                "https://j8b306.p.ssafy.io"
        ));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.setAllowedOrigins(originlst);
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        config.addExposedHeader(JwtProperties.HEADER_STRING);  // 헤더 보이게 설정하기

        source.registerCorsConfiguration("/api/**", config);
        return new CorsFilter(source);
    }
}
