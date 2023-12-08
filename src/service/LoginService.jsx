import request from "utils/Request"

// login
export const loginService = (params) => {
    return request('/api/account/admin/login', {
        method: 'POST',
        data: params
    })
}

// refresh token
export const refreshTokenService = () => {
    return request('/api/refresh/token', {
        method: 'POST'
    })
}

// logout
export const logoutService = () => {
    return request('/api/admin/logout', {
        method: 'POST'
    })
}

// forgot password
export const forgotPasswordService = (params) => {
    return request('/api/forget/password', {
        method: 'POST',
        data: params
    })
}

// validate OTP
export const validateOTPService = (params) => {
    return request('/api/validate/otp', {
        method: 'POST',
        data: params
    })
}

// reset password
export const resetPasswordService = (params) => {
    return request('/api/reset/password', {
        method: 'PUT',
        data: params
    })
}