import { APP_URLS } from "constant/Variable"
import Login from "page/Login"
import ForgotPasswordForm from "page/Login/components/ForgotPassword"
import LoginForm from "page/Login/components/Login"
import OtpForm from "page/Login/components/Otp"
import ResetPasswordForm from "page/Login/components/ResetPassword"
import MainPage from "page/MainPage"
import PageProducts from "page/Products"
import { Route, Routes, Navigate } from "react-router-dom"
import Anonymous from "./Anonymous"
import PrivateRoutes from "./PrivateRoutes"
import PageCustomers from "page/Customers"
import PageAccount from "page/Account"
import PageComments from "page/Comments"
import PageOrders from "page/Orders"
import PageBrandAndCategory from "page/BrandAndCategory"
import { notification } from 'antd';
import ErrorPage from "page/ErrorPage"

const AppRoutes = () => {
    // notification
    const [api, contextHolder] = notification.useNotification();

    const openNotification = (value, type) => {
        api[type]({
            message: 'Notification',
            description: value,
            duration: 3,
        });
    };

    return <>
        <Routes>
            <Route path="/" element={<Navigate to={APP_URLS.URL_LOGIN}></Navigate>}></Route>

            <Route element={<Anonymous />}>
                <Route path={APP_URLS.URL_LOGIN} element={<Login form={<LoginForm openNotification={openNotification} />} />}></Route>
                <Route path={APP_URLS.URL_FORGOT_PASS} element={<Login form={<ForgotPasswordForm openNotification={openNotification} />} />}></Route>
                <Route path={APP_URLS.URL_OTP} element={<Login form={<OtpForm openNotification={openNotification} />} />}></Route>
                <Route path={APP_URLS.URL_RESET_PASS} element={<Login form={<ResetPasswordForm openNotification={openNotification} />} />}></Route>

            </Route>

            <Route element={<PrivateRoutes />} >
                <Route path={APP_URLS.URL_PRODUCTS} element={<MainPage page={<PageProducts openNotification={openNotification} />} />} />
                <Route path={APP_URLS.URL_CUSTOMERS} element={<MainPage page={<PageCustomers />} />} />
                <Route path={APP_URLS.URL_ACCOUNT} element={<MainPage page={<PageAccount />} />} />
                <Route path={APP_URLS.URL_COMMENTS} element={<MainPage page={<PageComments />} />} />
                <Route path={APP_URLS.URL_ORDERS} element={<MainPage page={<PageOrders />} />} />
                <Route path={APP_URLS.URL_BRAND_CATEGORY} element={<MainPage page={<PageBrandAndCategory />} />} />
            </Route>

            <Route path="*" element={<MainPage page={<ErrorPage />} />} />
        </Routes>
        {contextHolder}
    </>
}

export default AppRoutes