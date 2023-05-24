package com.example.apigatewayservice.filter;

import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.OrderedGatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.core.Ordered;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;

@Component
@Slf4j
public class LoggingFilter extends AbstractGatewayFilterFactory<LoggingFilter.Config> {
    public LoggingFilter(){
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(Config config) {
        // Custom Pre Filter
//        return (exchange, chain) -> {
//            ServerHttpRequest request = exchange.getRequest();
//            ServerHttpResponse response = exchange.getResponse();
//
//            log.info("Global Filter baseMessage: -> {}", config.getBaseMessage()); // 사전에 할 작업
//
//            if(config.isPreLogger()){
//                log.info("Global Filter Start: request id -> {}", request.getId());
//            }
//            // Custom Post Filter
//            return chain.filter(exchange).then(Mono.fromRunnable(()->{ // 기존의 동기 방식이 아니라 비동식 방식에서 사용
//                log.info("Global Filter End: response code -> {}", response.getStatusCode()); // 사후에 할 작업. 후에 로그인 기능. 필터를 여기에 추가???
//            }));
//        };
        GatewayFilter filter = new OrderedGatewayFilter((exchange, chain) ->{
            // 필터 내용
            ServerHttpRequest request = exchange.getRequest();
            ServerHttpResponse response = exchange.getResponse();

            log.info("Logging Filter baseMessage: -> {}", config.getBaseMessage()); // 사전에 할 작업

            if(config.isPreLogger()){
                log.info("Logging PRE Filter Start: request id -> {}", request.getId());
            }
            // Custom Post Filter
            return chain.filter(exchange).then(Mono.fromRunnable(()->{ // 기존의 동기 방식이 아니라 비동식 방식에서 사용
                log.info("Logging POST Filter: response code -> {}", response.getStatusCode()); // 사후에 할 작업. 후에 로그인 기능. 필터를 여기에 추가???
            }));
        }, Ordered.HIGHEST_PRECEDENCE); // gateway filter를 구현시켜주는 자식 클래스



        return filter;
    }

    @Data
    public static class Config{
        private String baseMessage;
        private boolean preLogger;
        private boolean postLogger;

    }
}
