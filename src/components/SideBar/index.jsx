import { headerSelector } from "components/Header/HeaderSlice"
import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { APP_URLS } from "../../constant/Variable"
import iconShoe from 'assets/Image/icon-shoe.png'
import cutomers from 'assets/Image/customer.png'
import comment from 'assets/Image/comment.png'
import account from 'assets/Image/account.png'
import brand from 'assets/Image/brand.png'
import orders from 'assets/Image/orders.png'
import './Style.css'

const SideBar = (props) => {

    const items = [
        {
            key: 1,
            label: <NavLink to={APP_URLS.URL_PRODUCTS} className="sidebar--item flex text-[16px] w-full h-full pl-4 py-3">
                <span></span>
                <img className="w-[25px] h-[25px] object-cover object-center mr-2" src={iconShoe} alt="" />
                Products
            </NavLink>

        }, {
            key: 2,
            label: <NavLink to={APP_URLS.URL_BRAND_CATEGORY} className="sidebar--item flex text-[16px] pl-4 py-3">
                <span></span>
                <img className="w-[25px] h-[25px] object-cover object-center mr-2" src={brand} alt="" />
                Brands
            </NavLink>
        }, {
            key: 3,
            label: <NavLink to={APP_URLS.URL_CUSTOMERS} className="sidebar--item flex text-[16px] pl-4 py-3">
                <span></span>
                <img className="w-[25px] h-[25px] object-cover object-center mr-2" src={cutomers} alt="" />
                Customers
            </NavLink>
        }, {
            key: 4,
            label: <NavLink to={APP_URLS.URL_COMMENTS} className="sidebar--item flex text-[16px] pl-4 py-3">
                <span></span>
                <img className="w-[25px] h-[25px] object-cover object-center mr-2" src={comment} alt="" />
                Comments
            </NavLink>

        }, {
            key: 5,
            label: <NavLink to={APP_URLS.URL_ORDERS} className="sidebar--item flex text-[16px] pl-4 py-3">
                <span></span>
                <img className="w-[25px] h-[25px] object-cover object-center mr-2" src={orders} alt="" />
                Orders
            </NavLink>
        }, {
            key: 6,
            label: <NavLink to={APP_URLS.URL_ACCOUNT} className="sidebar--item flex text-[16px] pl-4 py-3">
                <span></span>
                <img className="w-[25px] h-[25px] object-cover object-center mr-2" src={account} alt="" />
                Account
            </NavLink>
        }
    ]

    const header = useSelector(headerSelector)

    return <div className={`${header.showSideBar ? 'w-[15%]' : 'w-0'} side-bar overflow-y-auto fixed top-[80px] left-0 bottom-0 duration-100 ease-linear`}>
        <ul className="py-6 px-4 bg-alice-blue h-full">
            {
                items.map((item, index) => <li
                    className="mb-6 text-white font-semibold tracking-[0.75px] text-[16px] relative"
                    key={index}
                >
                    {item.label}
                </li>)
            }
        </ul>
    </div>
}

export default SideBar