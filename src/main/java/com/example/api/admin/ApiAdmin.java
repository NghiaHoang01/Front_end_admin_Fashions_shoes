package com.example.api.admin;

import com.example.Entity.CustomUserDetails;
import com.example.config.JwtProvider;
import com.example.exception.CustomException;
import com.example.request.UserRequest;
import com.example.response.Response;
import com.example.service.RefreshTokenService;
import com.example.service.implement.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@RestController("authOfAdmin")
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:3000/", allowCredentials = "true")
public class ApiAdmin {
    @Autowired
    private UserServiceImpl userService;
    @Autowired
    private JwtProvider jwtProvider;
    @Autowired
    private RefreshTokenService refreshTokenService;

    @PostMapping("/register")
    public ResponseEntity<?> registerAdmin(@RequestBody UserRequest admin) throws CustomException {
        userService.registerAdmin(admin);

        Response response = new Response();
        response.setSuccess(true);
        response.setMessage("Register admin success !!!");

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> adminLogout() throws CustomException {
        CustomUserDetails admin = (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (admin != null) {
            if (!Objects.equals(admin.toString(), "anonymous")) {
                refreshTokenService.deleteRefreshTokenByUserId(admin.getUser().getId());
            }

            ResponseCookie tokenCookie = jwtProvider.cleanTokenCookie();
            ResponseCookie refreshTokenCodeCookie = jwtProvider.cleanRefreshTokenCodeCookie();

            Response response = new Response();
            response.setMessage("Logout success !!!");
            response.setSuccess(true);

            return ResponseEntity.ok()
                    .header(HttpHeaders.SET_COOKIE, tokenCookie.toString())
                    .header(HttpHeaders.SET_COOKIE, refreshTokenCodeCookie.toString())
                    .body(response);
        }
        throw new CustomException("Error System !!!");
    }
}
