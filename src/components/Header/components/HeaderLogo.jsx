import logo from "assets/Image/logoMain.jpg"
import { APP_URLS } from "constant/Variable"
import { Link } from "react-router-dom"
const HeaderLogo = (props) => {
    return <div className="h-full w-[15%] p-4 overflow-hidden flex justify-center items-center">
        <Link to={APP_URLS.URL_PRODUCTS}>
            <img src={logo} alt="" className="object-cover object-center" />
        </Link>
    </div>
}

export default HeaderLogo