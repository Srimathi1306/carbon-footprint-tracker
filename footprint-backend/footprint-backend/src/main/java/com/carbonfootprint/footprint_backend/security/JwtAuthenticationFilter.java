package com.carbonfootprint.footprint_backend.security;

import com.carbonfootprint.footprint_backend.entity.Organization;
import com.carbonfootprint.footprint_backend.repository.OrganizationRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;
    private final OrganizationRepository organizationRepository;

    public JwtAuthenticationFilter(
            JwtService jwtService,
            UserDetailsService userDetailsService,
            OrganizationRepository organizationRepository) {

        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
        this.organizationRepository = organizationRepository;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        final String authHeader =
                request.getHeader("Authorization");

        if (authHeader == null ||
                !authHeader.startsWith("Bearer ")) {

            filterChain.doFilter(request, response);
            return;
        }

        String token = authHeader.substring(7);

        System.out.println("========== JWT FILTER ==========");

        try {

            String email = jwtService.extractEmail(token);
            String accountType = jwtService.extractAccountType(token);

            System.out.println("Extracted Email: " + email);
            System.out.println("Account Type: " + accountType);

            if (email != null &&
                    SecurityContextHolder
                            .getContext()
                            .getAuthentication() == null) {

                /*
                 * ============================
                 * NORMAL USER / ADMIN
                 * ============================
                 */
                if ("USER".equals(accountType) ||
                        "ADMIN".equals(accountType)) {

                    UserDetails userDetails =
                            userDetailsService
                                    .loadUserByUsername(email);

                    boolean valid =
                            jwtService.validateToken(
                                    token,
                                    userDetails.getUsername()
                            );

                    System.out.println(
                            "User/Admin Token Valid: " + valid
                    );

                    if (valid) {

                        UsernamePasswordAuthenticationToken authentication =
                                new UsernamePasswordAuthenticationToken(
                                        userDetails,
                                        null,
                                        userDetails.getAuthorities()
                                );

                        authentication.setDetails(
                                new WebAuthenticationDetailsSource()
                                        .buildDetails(request)
                        );

                        SecurityContextHolder
                                .getContext()
                                .setAuthentication(authentication);

                        System.out.println(
                                "User/Admin Authentication Set"
                        );
                    }
                }

                /*
                 * ============================
                 * ORGANIZATION
                 * ============================
                 */
                else if ("ORGANIZATION".equals(accountType)) {

                    Organization organization =
                            organizationRepository
                                    .findByEmail(email)
                                    .orElse(null);

                    if (organization != null &&
                            !jwtService.isTokenExpired(token)) {

                        UserDetails organizationDetails =
                                new org.springframework.security.core.userdetails.User(
                                        organization.getEmail(),
                                        organization.getPassword(),
                                        List.of(
                                                new SimpleGrantedAuthority(
                                                        "ROLE_ORGANIZATION"
                                                )
                                        )
                                );

                        UsernamePasswordAuthenticationToken authentication =
                                new UsernamePasswordAuthenticationToken(
                                        organizationDetails,
                                        null,
                                        organizationDetails.getAuthorities()
                                );

                        authentication.setDetails(
                                new WebAuthenticationDetailsSource()
                                        .buildDetails(request)
                        );

                        SecurityContextHolder
                                .getContext()
                                .setAuthentication(authentication);

                        System.out.println(
                                "Organization Authentication Set"
                        );
                    }
                }
            }

        } catch (Exception e) {

            System.out.println(
                    "JWT Authentication Failed: "
                            + e.getMessage()
            );
        }

        filterChain.doFilter(request, response);
    }
}