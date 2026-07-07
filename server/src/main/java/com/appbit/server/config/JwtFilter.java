package com.appbit.server.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final CustomUserDetailsService userDetailsService;

    public JwtFilter(
            JwtService jwtService,
            CustomUserDetailsService userDetailsService) {

        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        System.out.println("\n========== JWT FILTER ==========");

        String authHeader = request.getHeader("Authorization");
        System.out.println("Authorization: " + authHeader);

        // Não existe Authorization
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {

            System.out.println("Nenhum Bearer Token encontrado.");

            filterChain.doFilter(request, response);
            return;
        }

        String token = authHeader.substring(7);

        System.out.println("Token: " + token);

        boolean tokenValido = jwtService.tokenValido(token);

        System.out.println("Token válido: " + tokenValido);

        if (!tokenValido) {

            System.out.println("JWT inválido.");

            filterChain.doFilter(request, response);
            return;
        }

        String email = jwtService.extrairEmail(token);

        System.out.println("Email extraído: " + email);

        if (email != null &&
                SecurityContextHolder.getContext().getAuthentication() == null) {

            UserDetails userDetails =
                    userDetailsService.loadUserByUsername(email);

            System.out.println("Usuário encontrado: "
                    + userDetails.getUsername());

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

            // Salva autenticação no contexto do Spring Security
            SecurityContextHolder
                    .getContext()
                    .setAuthentication(authentication);

            System.out.println("\n========== SECURITY CONTEXT ==========");
            System.out.println("Authentication: "
                    + SecurityContextHolder.getContext().getAuthentication());

            System.out.println("Principal: "
                    + SecurityContextHolder.getContext()
                    .getAuthentication()
                    .getPrincipal());

            System.out.println("Authorities: "
                    + SecurityContextHolder.getContext()
                    .getAuthentication()
                    .getAuthorities());

            System.out.println("Authenticated: "
                    + SecurityContextHolder.getContext()
                    .getAuthentication()
                    .isAuthenticated());

            System.out.println("======================================\n");
        }

        filterChain.doFilter(request, response);
    }
}
