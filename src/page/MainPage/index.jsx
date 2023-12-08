const { default: Header } = require("components/Header")
const { headerSelector } = require("components/Header/HeaderSlice")
const { default: SideBar } = require("components/SideBar")
const { useSelector } = require("react-redux")

const MainPage = (props) => {
    const header = useSelector(headerSelector)

    return <div className="page-products bg-white">
        <Header />

        <SideBar />

        <div className={`${header.showSideBar ? 'w-[84%] ml-[16%]' : 'w-full'} mt-[80px] duration-200 ease-linear`}>
            {props.page}
        </div>
    </div>
}

export default MainPage