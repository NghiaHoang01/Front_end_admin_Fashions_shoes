import { Form, Input, Spin } from "antd"
import { useForm } from "antd/es/form/Form";
import { APP_URLS } from "constant/Variable";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { TabTile } from "utils/TabTile";
import { checkEnterEmail, forgotPasswordAsync, loginSelector, sendError } from "../LoginSlice";

const ForgotPasswordForm = (props) => {

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const login = useSelector(loginSelector)

    const [fromForgotPassword] = useForm()

    const onFinish = async (values) => {
        const response = await dispatch(forgotPasswordAsync(values))
        if (response.payload.success) {
            await dispatch(checkEnterEmail(true))
            navigate(APP_URLS.URL_OTP)
        } else {
            props.openNotification(response.payload.message, 'error')
        }
    };

    useEffect(() => {
        TabTile('Forgot Password')

        if (login.sendError.error && login.sendError.title !== null) {
            props.openNotification(login.sendError.title, 'error')
            dispatch(sendError({
                error: false,
                title: ''
            }))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <Spin tip="Loading" size="large" spinning={login.isLoading}>
        <p className="text-eclipse text-[15px] tracking-[1px] mb-4 leading-[22px]">Lost your password? Please enter your email.
            You will receive a OTP code to create a new password via email.
        </p>
        <Form
            name="fromForgotPassword"
            form={fromForgotPassword}
            onFinish={onFinish}
            autoComplete="off"
            className='form-login'
        >
            <Form.Item
                name="email"
                rules={[
                    {
                        required: true,
                        message: 'Please input your email !!!'
                    },
                ]}
                style={{
                    marginBottom: 22
                }}
                className='form-login--item'
            >
                <Input type='email' placeholder='Email' />
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

export default ForgotPasswordForm