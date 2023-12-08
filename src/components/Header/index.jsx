import HeaderLogo from "./components/HeaderLogo"
import HeaderRight from "./components/HeaderRight"

const Header = (props) => {
    return <div className="header bg-alice-blue fixed top-0 left-0 right-0 h-[80px] z-[1000] flex justify-between items-center">
        <HeaderLogo />
        <HeaderRight />
    </div>
}

export default Header