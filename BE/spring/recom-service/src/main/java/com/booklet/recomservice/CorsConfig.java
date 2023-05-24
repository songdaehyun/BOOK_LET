package com.booklet.recomservice;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.ArrayList;
import java.util.List;


@Configuration
public class CorsConfig {

    /**
     * CORS 설정, 허락된 URL, 허락된 Origin
     * @return
     */
    List<String> originlst = new ArrayList<>(List.of(
            "http://localhost:3000",
            "https://localhost:3000",
            "http://j8b306.p.ssafy.io:3000",
            "https://j8b306.p.ssafy.io:3000",
            "https://j8b306.p.ssafy.io"
    ));
    List<String> list = new ArrayList<>(List.of(
            "GET","POST","PUT","OPTIONS","DELETE"
    ));
    @Bean
    public UrlBasedCorsConfigurationSource corsConfigurationSource() {
        UrlBasedCorsConfigurationSource corsConfigSource = new UrlBasedCorsConfigurationSource();

        CorsConfiguration corsConfig = new CorsConfiguration();
//        corsConfig.setAllowedHeaders(Arrays.asList(corsProperties.getAllowedHeaders().split(",")));
        corsConfig.addAllowedHeader("*");
        corsConfig.setAllowedMethods(list);
        corsConfig.setAllowedOrigins(originlst);
//        corsConfig.addAllowedOriginPattern("*");
        corsConfig.setAllowCredentials(true);
        corsConfig.setMaxAge(corsConfig.getMaxAge());

        corsConfigSource.registerCorsConfiguration("/**", corsConfig);
        return corsConfigSource;
    }
}