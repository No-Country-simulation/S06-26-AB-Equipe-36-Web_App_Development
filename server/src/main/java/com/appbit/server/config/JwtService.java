package com.appbit.server.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.SignatureAlgorithm;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;

import java.nio.charset.StandardCharsets;
import java.util.Date;

@Service
public class JwtService {

    @Value("${app.jwt.secret}")
    private String secret;

    @Value("${app.jwt.expiration-ms}")
    private long expiration;

    private SecretKey getKey() {

        return Keys.hmacShaKeyFor(
                secret.getBytes(StandardCharsets.UTF_8)
        );

    }

    public String gerarToken(String email) {

        Date agora = new Date();

        Date validade = new Date(
                agora.getTime() + expiration
        );

        return Jwts.builder()

                .subject(email)

                .issuedAt(agora)

                .expiration(validade)

                .signWith(
                        getKey(),
                        SignatureAlgorithm.HS256
                )

                .compact();

    }
    public String extrairEmail(String token) {

        return getClaims(token).getSubject();

    }


    public boolean tokenValido(String token) {

        try {

            getClaims(token);

            return true;

        } catch (Exception e) {

            return false;

        }

    }

    private Claims getClaims(String token) {

        return Jwts.parser()

                .verifyWith(getKey())

                .build()

                .parseSignedClaims(token)

                .getPayload();

    }

}
