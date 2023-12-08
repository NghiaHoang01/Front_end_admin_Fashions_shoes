import './Style.css'
const Login = (props) => {
    return <div className='relative flex justify-center items-center h-screen w-full'>
        <div className={`bg-[url('assets/Image/bg.jpg')] bg-cover bg-no-repeat  absolute top-0 right-0 left-0 bottom-0`}></div>
        <div className='flex justify-center items-center '>
            <div className="px-8 py-10 w-[500px] bg-[rgba(255,255,255,0.9)] rounded-[24px] shadow-[0px_0px_20px_10px_rgba(255,255,255,0.7)] z-10">
                {props.form}
            </div>
        </div>
    </div>
}

export default Login