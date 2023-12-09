package com.example.service;

import com.example.Entity.RefreshToken;
import com.example.exception.CustomException;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.Optional;

public interface RefreshTokenService {
    Optional <RefreshToken> findByRefreshTokenCode(String refreshTokenCode);

    RefreshToken createRefreshToken(Long userId) throws CustomException;

    RefreshToken verifyExpiration(RefreshToken refreshToken) throws CustomException;

    String deleteRefreshTokenByUserId(Long userId) throws CustomException;

    void deleteAllExpiredSince(LocalDateTime now);
}
