package com.kyf;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan(basePackages = { "com.kyf.domain" })
public class KyfApp {

    public static void main(String[] args){

        // start spring application
        ConfigurableApplicationContext springApp = SpringApplication.run(KyfApp.class, args);

        // retrieve the environment
        ConfigurableEnvironment environment = springApp.getEnvironment();


    }

}