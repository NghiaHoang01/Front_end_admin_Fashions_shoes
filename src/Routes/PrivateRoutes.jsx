import { APP_URLS } from "constant/Variable"
import { Navigate, Outlet } from "react-router-dom"

const PrivateRoutes = () => {
    const admin = localStorage.getItem("admin")

    return admin ? <Outlet /> : <Navigate to={APP_URLS.URL_LOGIN} />
}

export default PrivateRoutes