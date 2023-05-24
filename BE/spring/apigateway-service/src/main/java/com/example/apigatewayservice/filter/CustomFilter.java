package com.example.apigatewayservice.filter;

import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

@Component
@Slf4j
public class CustomFilter extends AbstractGatewayFilterFactory<CustomFilter.Config> {
    public CustomFilter(){
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {
            ServerHttpRequest request = exchange.getRequest();
            ServerHttpResponse response = exchange.getResponse();
            
            log.info("Custom PRE filter: request id -> {}", request.getId()); // 사전에 할 작업
            
            // Custom Post Filter
            return chain.filter(exchange).then(Mono.fromRunnable(()->{ // 기존의 동기 방식이 아니라 비동식 방식에서 사용
                log.info("Custom POST filter: response code -> {}", response.getStatusCode()); // 사후에 할 작업. 후에 로그인 기능. 필터를 여기에 추가???
            }));
            
        };
    }


    public static class Config{
        // Put the configuration properties
    }
}
