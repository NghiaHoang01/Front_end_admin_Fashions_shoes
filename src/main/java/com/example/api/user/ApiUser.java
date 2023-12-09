package com.example.api.user;

import com.example.Entity.CustomUserDetails;
import com.example.Entity.User;
import com.example.config.JwtProvider;
import com.example.exception.CustomException;
import com.example.request.PasswordRequest;
import com.example.request.UserRequest;
import com.example.response.Response;
import com.example.response.ResponseData;
import com.example.response.UserResponse;
import com.example.service.RefreshTokenService;
import com.example.service.implement.UserServiceImpl;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Objects;

@RestController("user")
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:3000/", allowCredentials = "true")
public class ApiUser {
    @Autowired
    private UserServiceImpl userService;
    @Autowired
    private HttpServletRequest request;
    @Autowired
    private JwtProvider jwtProvider;
    @Autowired
    private RefreshTokenService refreshTokenService;

    // CALL SUCCESS
    @PutMapping(value = "/update/profile")
    public ResponseEntity<?> updateInformation(@RequestBody UserRequest newUser) throws CustomException, IOException {
        User user = userService.updateInformation(newUser);

        UserResponse userInformation = new UserResponse();

        userInformation.setId(user.getId());
        userInformation.setAddress(user.getAddress());
        userInformation.setDistrict(user.getDistrict());
        userInformation.setProvince(user.getProvince());
        userInformation.setWard(user.getWard());
        userInformation.setEmail(user.getEmail());
        userInformation.setFirstName(user.getFirstName());
        userInformation.setLastName(user.getLastName());
        userInformation.setGender(user.getGender());
        userInformation.setMobile(user.getMobile());
        userInformation.setCreateAt(user.getCreatedAt());
        userInformation.setImageBase64(user.getAvatarBase64());

        ResponseData<UserResponse> response = new ResponseData<>();
        response.setMessage("Updated information success!!!");
        response.setSuccess(true);
        response.setResults(userInformation);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // CALL SUCCESS
    @PostMapping("/logout")
    public ResponseEntity<?> userLogout() throws CustomException {
        CustomUserDetails userDetails = (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (userDetails != null) {
            if (!Objects.equals(userDetails.toString(), "anonymous")) {
                refreshTokenService.deleteRefreshTokenByUserId(userDetails.getUser().getId());
            }
            ResponseCookie cookie = jwtProvider.cleanTokenCookie();
            ResponseCookie refreshTokenCookie = jwtProvider.cleanRefreshTokenCodeCookie();

            Response response = new Response();
            response.setMessage("Logout success !!!");
            response.setSuccess(true);

            return ResponseEntity.ok()
                    .header(HttpHeaders.SET_COOKIE, cookie.toString())
                    .header(HttpHeaders.SET_COOKIE, refreshTokenCookie.toString())
                    .body(response);
        } else {
            throw new CustomException("Error system");
        }
    }

    @PostMapping("/password")
    public ResponseEntity<?> confirmPassword(@RequestBody PasswordRequest passwordRequest) throws CustomException {
        Boolean result = userService.confirmPassword(passwordRequest);
        Response response = new Response();
        response.setSuccess(result);
        response.setMessage(result ? "Password matched !!!" : "Password not match !!!");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // CALL SUCCESS
    @PutMapping("/password")
    public ResponseEntity<?> changePassword(@RequestBody PasswordRequest passwordRequest) throws CustomException {
        Response response = userService.changePassword(passwordRequest);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/information")
    public ResponseEntity<?> getInformation() throws CustomException {
        String token = jwtProvider.getTokenFromCookie(request);

        User user = userService.findUserProfileByJwt(token);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
}
