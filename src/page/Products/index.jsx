import { Flex, Popconfirm, Spin, Table } from "antd"
import { useEffect, useState } from "react"
import { TabTile } from "utils/TabTile"
import FormSearch from "./components/FormSearch"
import ModalProduct from "./components/ModalProduct";
import ModalImageOfProduct from "./components/ModalImageOfProduct";
import { useDispatch, useSelector } from "react-redux"
import { deleteProductAsync, deleteSomeProductsAsync, getAllProductsAsync, productsSelector } from "./ProductsSlice"
import { useForm } from "antd/es/form/Form"
import generateColumnsData from './components/ColumnsData'
import './Style.css'

const PageProducts = (props) => {

    useEffect(() => {
        TabTile('Products')
    }, [])

    const { openNotification } = props

    const products = useSelector(productsSelector)

    const dispatch = useDispatch()

    const [paging, setPaging] = useState({
        pageIndex: 1,
        pageSize: 10
    })

    const handleChangePage = (page) => {
        setPaging({
            ...formSearchProduct.getFieldsValue(),
            pageIndex: page.current,
            pageSize: page.pageSize
        })
    }

    const [formSearchProduct] = useForm()

    const [formProduct] = useForm()

    const [hiddenColumn, setHiddenColumn] = useState(true)

    const [createProduct, setCreateProduct] = useState(true)

    const [sizes, setSizes] = useState([])

    const [mainImage, setMainImage] = useState([])

    const [secondaryImages, setSecondaryImages] = useState([])

    const [deleteSome, setDeleteSome] = useState(false)

    const [listIdProducts, setListIdProducts] = useState([])

    // rowSelection objects indicates the need for row selection
    const rowSelection = {
        onChange: (selectedRows) => {
            if (selectedRows.length === 0) {
                setDeleteSome(false)
                setListIdProducts([])
            } else {
                setDeleteSome(true)
                setListIdProducts(selectedRows);
            }
        }
    };

    // modal
    const [isModalProductOpen, setIsModalProductOpen] = useState(false);
    const [isModalImageOfProductOpen, setIsModalImageOfProductOpen] = useState(false)


    // create product
    const handleCreateProduct = () => {
        setCreateProduct(true)
        setIsModalProductOpen(true)
    }

    // update product
    const handleUpdateProduct = (record) => {
        setCreateProduct(false)
        setIsModalProductOpen(true)
        formProduct.setFieldsValue({
            ...record,
            discountedPrice: record.discountedPrice.toLocaleString("en-US"),
            brandId: record.brandProduct.id,
            parentCategoryId: record.parentCategoryOfProduct.id,
            childCategoryId: record.childCategoryOfProduct.id,
        })
        setSizes(record.sizes)
        setMainImage([{ thumbUrl: record.mainImageBase64 }])
        const secondaryImages = record.imageSecondaries.map((item) => {
            return { thumbUrl: item }
        })
        setSecondaryImages(secondaryImages)
    }

    // delete product
    const handleDeleteProduct = async (id) => {
        const response = await dispatch(deleteProductAsync(id))
        console.log(response)
        if (response.payload.success) {
            setPaging({
                pageIndex: 1,
                pageSize: 10
            })
            openNotification(response.payload.message, 'success')
        } else {
            openNotification(response.payload.message, 'error')
        }
    }

    // delete some products
    const handleDeleteSomeProducts = async () => {
        const response = await dispatch(deleteSomeProductsAsync(listIdProducts))
        if (response.payload.success) {
            setPaging({
                pageIndex: 1,
                pageSize: 10
            })
            setDeleteSome(false)
            setListIdProducts([])
            openNotification(response.payload.message, 'success')
        } else {
            openNotification(response.payload.message, 'error')
        }
    }

    // list image of product
    const handleListImageOfProduct = async (record) => {
        setMainImage(record.mainImageBase64)
        setSecondaryImages(record.imageSecondaries)
        setIsModalImageOfProductOpen(true)
    }

    // get all products
    const getAllProducts = async (params) => {
        await dispatch(getAllProductsAsync(params))
    }

    // generate columns in table show products
    const columns = generateColumnsData(
        { paging: paging },
        { hiddenColumn: hiddenColumn },
        { handleListImageOfProduct: handleListImageOfProduct },
        { handleUpdateProduct: handleUpdateProduct },
        { handleDeleteProduct: handleDeleteProduct },
        { deleteSome: deleteSome }
    )

    useEffect(() => {
        getAllProducts(paging)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paging, products.productInfor])

    return <Spin tip="Loading" size="large" spinning={products.isLoading}>
        <div className="page-products h-screen px-4 pb-7 pt-[15px] bg-white">
            <FormSearch
                formSearchProduct={formSearchProduct}
                hiddenColumn={hiddenColumn}
                setHiddenColumn={setHiddenColumn}
                setPaging={setPaging}
            />

            <Flex style={{ marginTop: 15 }} justify='space-between'>
                <button className='custom-btn px-7 py-[5px] w-[110px] mr-3 text-[14px] rounded-[8px]' onClick={handleCreateProduct}>Create</button>
                <Popconfirm
                    title="Delete the task"
                    description="Are you sure to delete this list products?"
                    onConfirm={handleDeleteSomeProducts}
                    okText="Yes"
                    cancelText="No"
                    disabled={!deleteSome}
                >
                    <button
                        className={`${deleteSome ? 'custom-btn' : 'btn-disabled'} px-7 py-[5px] mr-3 text-[14px] rounded-[8px]`}
                    >
                        Delete
                    </button>
                </Popconfirm>
            </Flex>

            <Table
                style={{
                    marginTop: 30
                }}
                columns={columns}
                dataSource={products?.listProducts}
                scroll={{ x: "150" }}
                rowKey='id'
                onChange={handleChangePage}
                pageIndex={paging.pageIndex}
                pagination={{
                    total: products.totalProduct,
                    current: paging.pageIndex,
                    pageSize: paging.pageSize,
                    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} products`
                }}
                rowSelection={rowSelection}
            />

            {/* Modal Product */}
            <ModalProduct
                isModalProductOpen={isModalProductOpen}
                createProduct={createProduct}
                setCreateProduct={setCreateProduct}
                setIsModalProductOpen={setIsModalProductOpen}
                formProduct={formProduct}
                sizes={sizes}
                setSizes={setSizes}
                mainImage={mainImage}
                setMainImage={setMainImage}
                secondaryImages={secondaryImages}
                setSecondaryImages={setSecondaryImages}
                openNotification={openNotification} />

            {/* Modal Image of Product */}
            <ModalImageOfProduct
                isModalImageOfProductOpen={isModalImageOfProductOpen}
                setIsModalImageOfProductOpen={setIsModalImageOfProductOpen}
                mainImage={mainImage}
                setMainImage={setMainImage}
                secondaryImages={secondaryImages}
                setSecondaryImages={setSecondaryImages}
            />
        </div >
    </Spin>
}

export default PageProducts