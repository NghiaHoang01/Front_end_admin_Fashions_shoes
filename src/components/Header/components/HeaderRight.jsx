import { Button, Dropdown, Modal } from "antd"
import { APP_URLS, MALE } from "constant/Variable";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { handleShowSideBar } from "../HeaderSlice";
import { ExclamationCircleFilled } from '@ant-design/icons';
import { useState } from "react";
import maleImage from 'assets/Image/Male.jpg'
import femaleImage from 'assets/Image/Female.jpg'
import { logoutAsync } from "page/Login/LoginSlice";

const HeaderRight = (props) => {

    const admin = JSON.parse(localStorage.getItem("admin"))

    const [isModalOpen, setIsModalProductOpen] = useState(false)

    const dispatch = useDispatch()

    const navigate = useNavigate()

    // modal
    const showModal = () => {
        setIsModalProductOpen(true)
    }

    const handleCancel = () => {
        setIsModalProductOpen(false)
    }

    const handleOk = async () => {
        const response = await dispatch(logoutAsync())
        if (response.payload.success) {
            localStorage.removeItem("admin")
            navigate(APP_URLS.URL_LOGIN)
            setIsModalProductOpen(false)
        }
    }

    const items = [
        {
            key: '1',
            label: (
                <Link to={APP_URLS.URL_PRODUCTS}>
                    My profile
                </Link>
            ),
        },
        {
            key: '2',
            label: (
                <Link to={APP_URLS.URL_PRODUCTS}>
                    Change password
                </Link>
            ),
        },
        {
            key: '3',
            label: (
                <button
                    className='bg-transparent w-full text-left border-none'
                    onClick={showModal}
                >
                    Log out
                </button>
            ),
        },
    ];

    const handleShowSidebar = async () => {
        await dispatch(handleShowSideBar())
    }

    return <div className="h-full bg-transparent w-[84%] p-4 mr-4 flex justify-between items-center overflow-hidden">
        <i
            className="fa-solid fa-bars text-[25px] text-white cursor-pointer duration-150 ease-linear hover:text-red-custom"
            onClick={handleShowSidebar}
        >
        </i>
        <Dropdown
            menu={{
                items,
            }}
            arrow
        >
            <div className="flex items-center cursor-pointer">
                <p className="mr-3 text-white font-medium ">{admin.lastName} {admin.firstName}<i className="fa-solid fa-angle-down text-[10px] ml-1"></i></p>
                <div className="w-11 h-11 rounded-[50%] border-[2px] border-grey overflow-hidden">
                    <img
                        className="object-cover object-center w-full h-full"
                        src={admin.imageBase64 !== null ? `data:image/png;base64,${admin?.imageBase64}` : (admin.gender === MALE ? maleImage : femaleImage)}
                        alt="error" />
                </div>
            </div>
        </Dropdown>

        <Modal title={<p><ExclamationCircleFilled /><span className='ml-[6px]'>Log out</span></p>}
            closeIcon={false}
            open={isModalOpen}
            footer={<>
                <Button type="default" onClick={handleCancel}>Cancel</Button>
                <Button type="primary" form='formProduct' onClick={handleOk}>Log out</Button>
            </>}
            className="log-out__confirm"
            width={300}
        >
            <p className='text-eclipse text-[16px] ml-[37px]'>Log out of your account?</p>
        </Modal>
    </div >
}

export default HeaderRight