import { Form, Input, Spin } from "antd"
import { useForm } from "antd/es/form/Form"
import { APP_URLS } from "constant/Variable";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { TabTile } from "utils/TabTile";
import { checkEnterEmail, checkEnterOtpCode, loginSelector, resetPasswordAsync, sendError } from "../LoginSlice";

const ResetPasswordForm = (props) => {

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const login = useSelector(loginSelector)

    const [formResetPassword] = useForm()

    const onFinish = async (values) => {
        if (login.isEnterOtpCode) {
            const response = await dispatch(resetPasswordAsync(values))
            if (response.payload.success) {
                await dispatch(checkEnterEmail(false))
                await dispatch(checkEnterOtpCode(false))
                navigate(APP_URLS.URL_LOGIN)
            } else {
                props.openNotification(response.payload.message)
            }
        } else {
            await dispatch(sendError({
                error: true,
                title: 'Please enter the OTP in your email before reset password !!!'
            }))
            navigate(APP_URLS.URL_OTP)
        }
    };

    useEffect(() => {
        TabTile('Reset Password')
    }, [])

    return <Spin tip="Loading" size="large" spinning={login.isLoading}>
        <p className='text-center text-[45px] uppercase font-semibold tracking-[2px] text-eclipse mb-6'>Reset Password</p>
        <Form
            name="formResetPassword"
            form={formResetPassword}
            onFinish={onFinish}
            autoComplete="off"
            className='form-login'
        >
            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please enter your password !!!'
                    },
                ]}
                style={{
                    marginBottom: 30
                }}
            >
                <Input.Password placeholder='New password' />
            </Form.Item>

            <Form.Item
                name="repeatPassword"
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your password !!!'

                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('Password that you entered do not match!'));
                        },
                    }),
                ]}
                style={{
                    marginBottom: 25
                }}
            >
                <Input.Password placeholder='Repeat your password' />
            </Form.Item>


            <div className='text-center'>
                <button className='login-btn px-12 py-[6px]'>Reset</button>
            </div>
        </Form>
        <div className="mt-1 text-center">
            <p className="text-grey text-[13px] tracking-[0.5px]">
                Already have account?
                <Link to={APP_URLS.URL_LOGIN} className='font-semibold text-eclipse ml-1 hover:text-red-custom ease-in-out duration-150'>Login</Link>
            </p>
        </div>
    </Spin>
}

export default ResetPasswordForm