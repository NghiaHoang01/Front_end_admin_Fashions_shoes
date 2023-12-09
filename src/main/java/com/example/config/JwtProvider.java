package com.example.config;

import com.example.Entity.User;
import com.example.constant.CookieConstant;
import com.example.constant.JwtConstant;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;
import org.springframework.web.util.WebUtils;

import java.security.Key;
import java.util.Date;

@Component
public class JwtProvider {
    private Key key() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(JwtConstant.SECRET_KEY));
    }

    public String generateToken(User user) {
        return Jwts.builder()
                .setIssuedAt(new Date())
                .setExpiration(new Date(new Date().getTime() + 300000L))
                .claim("email", user.getEmail())
                .signWith(key(), SignatureAlgorithm.HS256).compact();
    }

    public ResponseCookie generateTokenCookie(User user) {
        String token = generateToken(user);

        return ResponseCookie.from(CookieConstant.JWT_COOKIE, token)
                .path("/api")
                .maxAge(5*60)
                .httpOnly(true).secure(true).build();
    }

    public ResponseCookie generateRefreshTokenCodeCookie(String refreshTokenCode) {
        return ResponseCookie.from(CookieConstant.JWT_REFRESH_CODE_COOKIE, refreshTokenCode)
                .path("/api")
                .maxAge(24 * 60 * 60 * 10)
                .httpOnly(true).secure(true).build();
    }

    public String getTokenFromCookie(HttpServletRequest request) {
        Cookie tokenCookie = WebUtils.getCookie(request, CookieConstant.JWT_COOKIE);

        if (tokenCookie != null) {
            return tokenCookie.getValue();
        } else {
            return null;
        }
    }

    public String getRefreshTokenCodeFromCookie(HttpServletRequest request) {
        Cookie refreshToken = WebUtils.getCookie(request, CookieConstant.JWT_REFRESH_CODE_COOKIE);
        if (refreshToken != null) {
            return refreshToken.getValue();
        } else {
            return null;
        }
    }

    public ResponseCookie cleanTokenCookie() {
        return ResponseCookie.from(CookieConstant.JWT_COOKIE, "").path("/api").maxAge(0).build();
    }

    public ResponseCookie cleanRefreshTokenCodeCookie(){
        return ResponseCookie.from(CookieConstant.JWT_REFRESH_CODE_COOKIE, "").path("/api").maxAge(0).build();
    }

    public boolean validateJwtToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key()).build().parse(token);
            return true;
        } catch (MalformedJwtException e) {
            throw new MalformedJwtException("Invalid JWT token");
        } catch (ExpiredJwtException e) {
            throw new ExpiredJwtException(null, null, "JWT token is expired");
        } catch (UnsupportedJwtException e) {
            throw new UnsupportedJwtException("JWT token is unsupported");
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("JWT claims string is empty");
        }
    }

    public Claims getClaimsFormToken(String jwt) {
        return Jwts.parserBuilder()
                .setSigningKey(key())
                .build()
                .parseClaimsJws(jwt)
                .getBody();
    }
}
