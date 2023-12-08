import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { forgotPasswordService, loginService, logoutService, resetPasswordService, validateOTPService } from "service/LoginService"

const initialState = {
    isLoading: false,
    adminInfor: {},
    status: {},
    isEnterEmail: false,
    isEnterOtpCode: false,
    sendError: {
        error: false,
        title: ''
    }
}

// login
export const loginAsync = createAsyncThunk("login", async (params) => {
    const response = await loginService(params)
    return response.data
})

// logout
export const logoutAsync = createAsyncThunk("logout", async () => {
    const response = await logoutService()
    return response.data
})

// forgot password
export const forgotPasswordAsync = createAsyncThunk("forgotPassword", async (params) => {
    const response = await forgotPasswordService(params)
    return response.data
})

// validate Otp code
export const validateOtpCodeAsync = createAsyncThunk("validateOtpCode", async (params) => {
    const response = await validateOTPService(params)
    return response.data
})

// reset password
export const resetPasswordAsync = createAsyncThunk("resetPassword", async (params) => {
    const response = await resetPasswordService(params)
    return response.data
})

export const login = createSlice({
    name: 'LoginSlice',
    initialState,
    reducers: {
        checkEnterEmail: (state, action) => {
            state.isEnterEmail = action.payload
        },
        checkEnterOtpCode: (state, action) => {
            state.isEnterOtpCode = action.payload
        },
        sendError: (state, action) => {
            state.sendError.error = action.payload.error
            state.sendError.title = action.payload.title
        }
    },
    extraReducers: builder => {
        builder
            // admin login
            .addCase(loginAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(loginAsync.fulfilled, (state, action) => {
                state.isLoading = false
                state.adminInfor = action.payload
            })

            // admin logout
            .addCase(logoutAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(logoutAsync.fulfilled, (state, action) => {
                state.isLoading = false
                state.status = action.payload
            })

            // forgot password
            .addCase(forgotPasswordAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(forgotPasswordAsync.fulfilled, (state) => {
                state.isLoading = false
            })

            // validate Otp code
            .addCase(validateOtpCodeAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(validateOtpCodeAsync.fulfilled, (state) => {
                state.isLoading = false
            })

            // reset password
            .addCase(resetPasswordAsync.pending, (state) => {
                state.isLoading = true
            })
            .addCase(resetPasswordAsync.fulfilled, (state, action) => {
                state.isLoading = false
                state.status = action.payload
            })
    }
})

export const { checkEnterEmail, checkEnterOtpCode, sendError } = login.actions

export const loginSelector = state => state.login

export default login.reducer;