package lyhour.api.commons.configs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.security.SecurityRequirement;

@Configuration
public class SwaggerConfig {

        @Bean
        public OpenAPI customOpenAPI() {
                return new OpenAPI()
                                .addSecurityItem(new SecurityRequirement().addList("BearerAuth"))
                                .components(new io.swagger.v3.oas.models.Components()
                                                .addSecuritySchemes("BearerAuth",
                                                                new SecurityScheme()
                                                                                .name("Authorization")
                                                                                .type(SecurityScheme.Type.HTTP)
                                                                                .scheme("bearer")
                                                                                .bearerFormat("JWT")))
                                .info(new Info()
                                                .title("Java Final API")
                                                .version("1.0"));
        }
}
