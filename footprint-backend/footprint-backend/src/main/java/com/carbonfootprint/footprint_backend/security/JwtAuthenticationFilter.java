package com.carbonfootprint.footprint_backend.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    public JwtAuthenticationFilter(JwtService jwtService,
                                   UserDetailsService userDetailsService) {
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

//        String token = authHeader.substring(7);
//
//        String email = jwtService.extractEmail(token);
//
//        if (email != null &&
//                SecurityContextHolder.getContext().getAuthentication() == null) {
//
//            UserDetails userDetails =
//                    userDetailsService.loadUserByUsername(email);
//
//            if (jwtService.validateToken(token, userDetails.getUsername())) {
//
//                UsernamePasswordAuthenticationToken authentication =
//                        new UsernamePasswordAuthenticationToken(
//                                userDetails,
//                                null,
//                                userDetails.getAuthorities()
//                        );
//
//                authentication.setDetails(
//                        new WebAuthenticationDetailsSource()
//                                .buildDetails(request)
//                );
//
//                SecurityContextHolder.getContext()
//                        .setAuthentication(authentication);
//            }
//        }
//
//        filterChain.doFilter(request, response);


        String token = authHeader.substring(7);

        System.out.println("========== JWT FILTER ==========");

        String email = jwtService.extractEmail(token);
        System.out.println("Extracted Email: " + email);

        if (email != null &&
                SecurityContextHolder.getContext().getAuthentication() == null) {

            UserDetails userDetails =
                    userDetailsService.loadUserByUsername(email);

            System.out.println("Loaded Username: " + userDetails.getUsername());

            boolean valid = jwtService.validateToken(token, userDetails.getUsername());
            System.out.println("Token Valid: " + valid);

            if (valid) {

                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,
                                userDetails.getAuthorities()
                        );

                authentication.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request)
                );

                SecurityContextHolder.getContext().setAuthentication(authentication);

                System.out.println("Authentication Set Successfully");
            }
        }

        filterChain.doFilter(request, response);
    }
}
