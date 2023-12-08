import { Form, Input, Spin } from "antd"
import { useForm } from "antd/es/form/Form"
import { APP_URLS } from "constant/Variable";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { TabTile } from "utils/TabTile";
import { checkEnterOtpCode, loginSelector, sendError, validateOtpCodeAsync } from "../LoginSlice";

const OtpForm = (props) => {

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const login = useSelector(loginSelector)

    const [formValidateOtp] = useForm()

    const onFinish = async (values) => {
        if (login.isEnterEmail) {
            const response = await dispatch(validateOtpCodeAsync(values))
            if (response.payload.success) {
                await dispatch(checkEnterOtpCode(true))
                navigate(APP_URLS.URL_RESET_PASS)
            } else {
                props.openNotification(response.payload.message, 'error')
            }
        } else {
            await dispatch(sendError({
                error: true,
                title: 'Please enter the email before enter the OTP !!!'
            }))
            navigate(APP_URLS.URL_FORGOT_PASS)
        }
    };

    useEffect(() => {
        TabTile('Validate OTP')

        if (login.sendError.error && login.sendError.title !== '') {
            props.openNotification(login.sendError.title, 'error')
            dispatch(sendError({
                error: false,
                title: ''
            }))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <Spin tip="Loading" size="large" spinning={login.isLoading}>
        <p className='text-center text-[45px] uppercase font-semibold tracking-[2px] text-eclipse'>Enter OTP</p>
        <p className="text-center text-[12.5px] text-eclipse font-medium tracking-[2px] mb-6">OTP sent to your email success, Enter your OTP !!!</p>

        <Form
            name="formValidateOtp"
            form={formValidateOtp}
            onFinish={onFinish}
            autoComplete="off"
            className='form-login'
        >
            <Form.Item
                name="otp"
                rules={[
                    {
                        required: true,
                        message: 'Please enter your OTP code !!!'
                    },
                ]}
                style={{
                    marginBottom: 25
                }}
                className='form-login--item'
            >
                <Input placeholder='OTP code' />
            </Form.Item>

            <div className='text-center'>
                <button className='login-btn px-12 py-[6px]'>Submit</button>
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

export default OtpForm