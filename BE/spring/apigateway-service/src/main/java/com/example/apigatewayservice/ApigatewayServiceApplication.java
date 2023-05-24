package com.example.apigatewayservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class ApigatewayServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(ApigatewayServiceApplication.class, args);
	}

//	@Bean
	public RouteLocator gatewayRoutes(RouteLocatorBuilder routeLocatorBuilder) {
		return routeLocatorBuilder
				.routes()
				.route(r -> r.path("/first-service/**")// 1.path를 확인하고
						.filters(f -> f// 2.필터를 적용하여
								.addRequestHeader("first-request", "first-service-requestHeader")
								.addResponseHeader("first-response", "first-service-responseHeader"))
						.uri("http://localhost:8081/"))//uri로 이동시켜준다.

				.route(r -> r.path("/second-service/**")
						.filters(f -> f
								.addRequestHeader("second-request", "second-service-requestHeader")
								.addResponseHeader("second-response", "second-service-responseHeader"))
						.uri("http://localhost:8082/"))
				.build();
	}

}
