package com.hidechat.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {

                registry.addMapping("/**") // sab endpoints allow
                        .allowedOrigins("*") // sab origins allow (frontend localhost etc.)
                        .allowedMethods("*") // GET, POST, PUT, DELETE sab allow
                        .allowedHeaders("*"); // sab headers allow
            }
        };
    }
}