import { useForm } from "antd/es/form/Form";
import { APP_URLS } from "constant/Variable";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { TabTile } from "utils/TabTile";
import { loginAsync, loginSelector } from "../LoginSlice";
import { Input, Form, Spin } from 'antd'

const LoginForm = (props) => {

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const login = useSelector(loginSelector)

    const [formLogin] = useForm()

    const onFinish = async (values) => {
        const response = await dispatch(loginAsync(values))

        if (response.payload.success) {
            formLogin.resetFields()
            localStorage.setItem("admin", JSON.stringify(response.payload.results))
            navigate(APP_URLS.URL_PRODUCTS)
        } else {
            switch (response.payload.status) {
                case 500:
                    props.openNotification(response.payload.message, 'error')
                    break
                case 403:
                    props.openNotification('User not found !!!', 'error')
                    break
                default:
                    props.openNotification(response.payload.message, 'error')
            }
        }
    };

    useEffect(() => {
        TabTile('Login')

        if (login.status.message !== '' && login.status.success) {
            props.openNotification(login.status.message, 'success')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <Spin tip="Loading" size="large" spinning={login.isLoading}>
        <p className='text-center text-[45px] uppercase font-semibold tracking-[2px] text-eclipse'>Welcome</p>
        <p className='text-center text-[12.5px] text-eclipse font-medium tracking-[2px] mb-6'>Please login to admin dashboard</p>

        <Form
            name="formLogin"
            form={formLogin}
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
                    marginBottom: 30
                }}
                className='form-login--item'
            >
                <Input type="email" placeholder='Email' />
            </Form.Item>

            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password !!!'
                    },
                ]}
                style={{
                    marginBottom: 5
                }}
            >
                <Input.Password placeholder='Password' />
            </Form.Item>

            <div className="mb-5 text-right">
                <Link to={APP_URLS.URL_FORGOT_PASS} className='text-eclipse inline-block font-semibold tracking-[0.5px] hover:text-red-custom ease-in-out duration-150'>Forgot Password?</Link>
            </div>
            <div className='text-center'>
                <button className='login-btn px-16 py-[7px]'>Login</button>
            </div>
        </Form>
    </Spin>
}

export default LoginForm