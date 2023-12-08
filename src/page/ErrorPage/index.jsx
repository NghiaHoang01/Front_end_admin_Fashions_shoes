import { APP_URLS } from "constant/Variable"
import { useNavigate } from "react-router-dom"

const ErrorPage = () => {

    const navigate = useNavigate()

    return <div className="page-error pt-[60px] bg-white text-center flex flex-col justify-center items-center">
        <p className='relative uppercase text-red-custom text-[230px] tracking-[5.5px] font-thin inline-block mb-[-50px]'>
            oops!
            <span className='absolute bg-white py-3 px-6 uppercase font-thin text-gray15 text-[22px] left-[100px] bottom-[60px]'>404-the page can't be found</span>
        </p>
        <button className='custom-btn px-10 py-2 text-[16px] rounded-[8px]' onClick={() => { navigate(APP_URLS.URL_PRODUCTS) }}>Back Home</button>
    </div>
}

export default ErrorPage