import { Button, Modal, Spin } from "antd"
import { useSelector } from "react-redux"
import { productsSelector } from "../ProductsSlice"
import FormProduct from "./FormProduct"
import FormSizeOfProDuct from "./FormSizeOfProduct"

const ModalProduct = (props) => {

    const { createProduct, setCreateProduct, isModalProductOpen, setIsModalProductOpen, formProduct, openNotification, sizes,
        setSizes, mainImage, setMainImage, secondaryImages, setSecondaryImages } = props

    const products = useSelector(productsSelector)


    const handleCancelModalProduct = () => {
        setIsModalProductOpen(false);
        formProduct.resetFields()
        setSizes([])
        setMainImage([])
        setSecondaryImages([])
    };

    return <Modal
        title={createProduct ? 'Create Product' : 'Update Product'}
        width={715}
        open={isModalProductOpen}
        onCancel={handleCancelModalProduct}
        footer={
            <>
                <Button type="default" onClick={handleCancelModalProduct}>Cancel</Button>
                <Button type="primary" htmlType="submit" form='formProduct'>{createProduct ? 'Create' : 'Update'}</Button>
            </>
        }>

        <Spin tip="Loading" size="large" spinning={products.isLoading}>
            <FormProduct
                formProduct={formProduct}
                setIsModalProductOpen={setIsModalProductOpen}
                createProduct={createProduct}
                setCreateProduct={setCreateProduct}
                sizes={sizes}
                setSizes={setSizes}
                mainImage={mainImage}
                setMainImage={setMainImage}
                secondaryImages={secondaryImages}
                setSecondaryImages={setSecondaryImages}
                openNotification={openNotification} />

            <FormSizeOfProDuct
                sizes={sizes}
                setSizes={setSizes}
                openNotification={openNotification} />
        </Spin>
    </Modal>
}

export default ModalProduct