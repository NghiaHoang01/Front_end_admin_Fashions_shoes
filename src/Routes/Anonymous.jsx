const { APP_URLS } = require("constant/Variable")
const { Outlet, Navigate } = require("react-router-dom")

const Anonymous = () => {
    const admin = localStorage.getItem("admin")

    return admin ? <Navigate to={APP_URLS.URL_PRODUCTS} /> : <Outlet />
}

export default Anonymous