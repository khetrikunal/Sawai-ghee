package com.sawai.ghee.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.io.File;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Value("${sawai.upload.dir:uploads}")
    private String uploadDir;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        File directory = new File(uploadDir);
        String uploadPath = directory.getAbsolutePath();
        
        // Ensure directory exists so Spring can map resource handlers correctly
        if (!directory.exists()) {
            directory.mkdirs();
        }

        registry.addResourceHandler("/api/products/images/**")
                .addResourceLocations("file:" + uploadPath + "/");
    }
}
