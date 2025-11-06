package lyhour.api.commons.securities;

import java.io.IOException;
import java.util.List;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lyhour.api.commons.dtos.responses.BaseResponseDto;
import lyhour.api.entities.User;
import lyhour.api.services.JwtService;
import lyhour.api.services.UserService;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserService userService;
    private final ObjectMapper objectMapper;

    // public routes
    private static final List<String> PUBLIC_URLS = List.of(
            "/api/auth/login",
            "/api/auth/register",
            "/api/v3/api-docs",
            "/api/swagger-ui");

    public JwtAuthenticationFilter(JwtService jwtService, UserService userService, ObjectMapper objectMapper) {
        this.jwtService = jwtService;
        this.userService = userService;
        this.objectMapper = objectMapper;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        String path = request.getRequestURI();

        for (String publicPath : PUBLIC_URLS) {
            if (path.startsWith(publicPath)) {
                filterChain.doFilter(request, response);
                return;
            }
        }

        String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            unauthorizedResponse(response, "Unauthorized");
            return;
        }

        String token = authHeader.substring(7);

        try {
            Long userId = jwtService.extractUserId(token);
            User user = userService.findById(userId);

            if (user == null || !jwtService.isTokenValid(token, user.getUsername())) {
                unauthorizedResponse(response, "Invalid or expired token");
                return;
            }

            UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                    user,
                    null,
                    List.of(new SimpleGrantedAuthority("USER")));
            SecurityContextHolder.getContext().setAuthentication(authToken);

        } catch (Exception e) {
            unauthorizedResponse(response, "Unauthorized");
            return;
        }

        filterChain.doFilter(request, response);
    }

    private void unauthorizedResponse(HttpServletResponse response, String message) throws IOException {
        response.setContentType("application/json");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

        BaseResponseDto<Void> apiResponse = BaseResponseDto.fail(401, message);
        objectMapper.writeValue(response.getWriter(), apiResponse);
    }
}
