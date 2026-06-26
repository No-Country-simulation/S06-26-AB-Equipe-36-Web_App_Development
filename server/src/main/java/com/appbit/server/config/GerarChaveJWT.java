package com.appbit.server.config;

import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;

public class GerarChaveJWT {

    public static void main(String[] args) {

        String chave = Encoders.BASE64.encode(
                Keys.secretKeyFor(io.jsonwebtoken.SignatureAlgorithm.HS256)
                        .getEncoded());

        System.out.println(chave);

    }
}