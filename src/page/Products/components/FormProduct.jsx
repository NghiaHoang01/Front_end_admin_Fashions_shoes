import { Flex, Form, Input, InputNumber, Select, Typography, Upload } from "antd"
import { LIST_COLORS } from "constant/Variable"
import { PlusOutlined } from '@ant-design/icons';
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { createNewProductAsync, getAllBrandsAsync, getAllChildCategoriesByParentCategoryIdAsync, getAllParentCategoriesByBrandAsync, updateProductAsync } from "../ProductsSlice";
import { Capitalize } from "utils/Capitlalize";
import { ConvertImageToBase64 } from "utils/ConvertImageToBase64";

const FormProduct = (props) => {

    const { formProduct, setIsModalProductOpen, createProduct, setCreateProduct, sizes, setSizes,
        mainImage, setMainImage, secondaryImages, setSecondaryImages, openNotification } = props

    // useState of brand, parent category and child category
    const [brands, setBrands] = useState([])
    const [parentCategories, setParentCategories] = useState([])
    const [childCategories, setChildCategories] = useState([])

    const dispatch = useDispatch()

    const discountedPrice = Form.useWatch('price', formProduct) - (Form.useWatch('price', formProduct) * Form.useWatch('discountedPercent', formProduct) / 100)

    // brand
    const getBrands = async () => {
        const response = await dispatch(getAllBrandsAsync())
        setBrands(response.payload?.map((item) => {
            return {
                value: item.id,
                label: Capitalize(item.name.split(' ')).toString().replaceAll(',', ' ')
            }
        }))
    }

    const handleChangeBrand = (value) => {
        getParentCategoryByBrand(value)
        setParentCategories([])
        setChildCategories([])
        formProduct.resetFields(['parentCategoryId', 'childCategoryId'])
    }

    // parent category
    const getParentCategoryByBrand = async (value) => {
        const response = await dispatch(getAllParentCategoriesByBrandAsync({
            brandId: value
        }))
        setParentCategories(response.payload?.map((item) => {
            return {
                value: item.id,
                label: Capitalize(item.name.split(' ')).toString().replaceAll(',', ' ')
            }
        }))
    }

    const handleChangeParentCategory = (value) => {
        getChildCategoryByParentCategory(value)
        setChildCategories([])
        formProduct.resetFields(['childCategoryId'])
    }

    // child category
    const getChildCategoryByParentCategory = async (value) => {
        const response = await dispatch(getAllChildCategoriesByParentCategoryIdAsync({
            parentCategoryId: value
        }))
        setChildCategories(response.payload?.map((item) => {
            return {
                value: item.id,
                label: Capitalize(item.name.split(' ')).toString().replaceAll(',', ' ')
            }
        }))
    }

    const handleChangeChildCategory = (value) => {
        console.log(`selected child category: ${value}`);
    }

    // color
    const handleChangeColor = (value) => {
        console.log(`selected color: ${value}`);
    }

    // main image
    const handleChangeMainImage = ({ fileList: newFileList }) => {
        setMainImage(newFileList)
    };

    // list secondary images
    const handleChangeSecondaryImages = ({ fileList: newFileList }) => {
        setSecondaryImages(newFileList)
    };

    const normFileImage = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    // finish form
    const onFinishFormProduct = async (values) => {
        // khong lay gia tri thumbUrl có san cua Antd vì nó xuất ra image/png có thể làm mờ ảnh nếu ảnh có file khác .png

        // lấy duy nhất một ảnh chính
        values.mainImageBase64 = mainImage[0]?.originFileObj !== undefined ? await ConvertImageToBase64(mainImage[0]?.originFileObj) : mainImage[0].thumbUrl

        // chỉ lấy đúng 7 ảnh phụ
        const sevenImageSecondary = secondaryImages.length > 7 ? secondaryImages.slice(0, 7) : secondaryImages
        try {
            values.imageSecondaries = await Promise.all(sevenImageSecondary.map(item => {
                if (item.originFileObj !== undefined) {
                    return ConvertImageToBase64(item?.originFileObj);
                } else {
                    return item.thumbUrl
                }
            }));
        } catch (error) {
        }

        // kiểm tra xem sản phẩm đã có size chưa
        if (sizes.length === 0) {
            openNotification("Please input size of product !!!", 'error')
        } else {
            const productInfor = { ...values, sizes: sizes }
            console.log(productInfor)
            let response;

            // create or update product
            if (createProduct) {
                response = await dispatch(createNewProductAsync(productInfor))
            } else {
                response = await dispatch(updateProductAsync(productInfor))
            }

            // display notification
            if (response.payload.success) {
                openNotification(response.payload.message, 'success')
                formProduct.resetFields()
                setMainImage([])
                setSecondaryImages([])
                setSizes([])
                setIsModalProductOpen(false)
                setCreateProduct(true)
            } else {
                openNotification(response.payload.message, 'error')
            }
        }
    };

    useEffect(() => {
        getBrands()

        // duoc su dung khi update product
        if (formProduct.getFieldValue('brandId') !== undefined) {
            getParentCategoryByBrand(formProduct.getFieldValue('brandId'))
        }

        if (formProduct.getFieldValue('parentCategoryId') !== undefined) {
            getChildCategoryByParentCategory(formProduct.getFieldValue('parentCategoryId'))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formProduct.getFieldValue('brandId'), formProduct.getFieldValue('parentCategoryId')])

    return <Form
        name='formProduct'
        form={formProduct}
        id='formProduct'
        autoComplete="off"
        layout="vertical"
        className="form"
        initialValues={{
            price: 0,
            discountedPercent: 0,
        }}
        onFinish={onFinishFormProduct}
    >
        <Flex style={{ width: '100%' }} justify='space-between'>
            <Form.Item
                name="id"
                style={{
                    display: 'none'
                }}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="name"
                label={<p className="text-eclipse text-[16.5px] font-semibold tracking-[0.75px]">Name</p>}
                rules={[
                    {
                        required: true,
                        message: 'Please input name of product !!!'
                    },
                ]}
                style={{
                    width: '49%',
                    marginBottom: 20
                }}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="title"
                label={<p className="text-eclipse text-[16.5px] font-semibold tracking-[0.75px]">Title</p>}
                rules={[
                    {
                        required: true,
                        message: 'Please input title of product !!!'
                    },
                ]}
                style={{
                    width: '49%',
                    marginBottom: 20
                }}
            >
                <Input />
            </Form.Item>
        </Flex>

        <Form.Item
            name="description"
            label={<p className="text-eclipse text-[16.5px] font-semibold tracking-[0.75px]">Description</p>}
            rules={[
                {
                    required: true,
                    message: 'Please input description of product !!!'
                },
            ]}
            style={{
                width: '100%',
                marginBottom: 20
            }}
        >
            <Input.TextArea rows={3} />
        </Form.Item>

        <Flex style={{ width: '100%' }} justify='space-between'>
            <Form.Item
                name="price"
                label={<p className="text-eclipse text-[16.5px] font-semibold tracking-[0.75px]">Price (vnđ)</p>}
                rules={[
                    {
                        required: true,
                        message: 'Please input price of product !!!'
                    },
                ]}
                style={{
                    width: '49%',
                    marginBottom: 20
                }}
            >
                <InputNumber
                    style={{ width: '100%' }}
                    min={0}
                    formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                />
            </Form.Item>

            <Form.Item
                name="discountedPercent"
                label={<p className="text-eclipse text-[16.5px] font-semibold tracking-[0.75px]">Discounted %</p>}
                style={{
                    width: '49%',
                    marginBottom: 20
                }}
            >
                <InputNumber
                    style={{ width: '100%' }}
                    min={0}
                    max={100}
                    formatter={(value) => `${value}`}
                />
            </Form.Item>
        </Flex>

        <Flex style={{ width: '100%' }} justify='space-between'>
            <Form.Item
                name='discountedPrice'
                label={<p className="text-eclipse text-[16.5px] font-semibold tracking-[0.75px]">Discounted Price (vnđ)</p>}
                style={{
                    width: '49%',
                    marginBottom: 20
                }}
            >
                <Typography>
                    <pre>{Math.round(discountedPrice).toLocaleString("en-US")}</pre>
                </Typography>
            </Form.Item>

            <Form.Item
                name="color"
                label={<p className="text-eclipse text-[16.5px] font-semibold tracking-[0.75px]">Color</p>}
                rules={[
                    {
                        required: true,
                        message: 'Please select color of product !!!'
                    },
                ]}
                style={{
                    width: '49%',
                    marginBottom: 20
                }}
                className='form--select'
            >
                <Select
                    onChange={handleChangeColor}
                    options={LIST_COLORS}
                />
            </Form.Item>
        </Flex>

        <Flex style={{ width: '100%' }} justify='space-between'>
            <Form.Item
                name="brandId"
                label={<p className="text-eclipse text-[16.5px] font-semibold tracking-[0.75px]">Brand</p>}
                rules={[
                    {
                        required: true,
                        message: 'Please select brand of product !!!'
                    },
                ]}
                style={{
                    width: '32%',
                    marginBottom: 30
                }}
                className='form--select'
            >
                <Select
                    onChange={handleChangeBrand}
                    options={brands}
                />
            </Form.Item>

            <Form.Item
                name="parentCategoryId"
                label={<p className="text-eclipse text-[16.5px] font-semibold tracking-[0.75px]">Parent Category</p>}
                rules={[
                    {
                        required: true,
                        message: 'Please select parent category of product !!!'
                    },
                ]}
                style={{
                    width: '32%',
                    marginBottom: 30
                }}
                className='form--select'
            >
                <Select
                    onChange={handleChangeParentCategory}
                    options={parentCategories}
                />
            </Form.Item>

            <Form.Item
                name="childCategoryId"
                label={<p className="text-eclipse text-[16.5px] font-semibold tracking-[0.75px]">Child Category</p>}
                rules={[
                    {
                        required: true,
                        message: 'Please select child category of product !!!'
                    },
                ]}
                style={{
                    width: '32%',
                    marginBottom: 30
                }}
                className='form--select'
            >
                <Select
                    onChange={handleChangeChildCategory}
                    options={childCategories}
                />
            </Form.Item>
        </Flex>

        <Flex style={{ width: '100%' }} justify='space-between'>
            <Form.Item
                name='mainImageBase64'
                label={<p className="text-eclipse text-[16.5px] font-semibold tracking-[0.75px]">Main Image</p>}
                getValueFromEvent={normFileImage}
                rules={[
                    {
                        required: true,
                        message: 'Please choose main image of product !!!'
                    },
                ]}
                style={{
                    width: '32%',
                    marginBottom: 20
                }}
            >
                <Upload
                    accept=".png,.jpg,.jpeg,.avif,.webp,.jfif"
                    listType="picture-card"
                    fileList={mainImage}
                    showUploadList={{
                        showPreviewIcon: false,
                    }}
                    onChange={handleChangeMainImage}
                    beforeUpload={() => false}
                >
                    {
                        mainImage.length < 1
                        && <div>
                            <PlusOutlined />
                            <div
                                style={{
                                    marginTop: 8,
                                }}
                            >
                                Upload
                            </div>
                        </div>
                    }
                </Upload>
            </Form.Item>

            <Form.Item
                name='imageSecondaries'
                label={<p className="text-eclipse text-[16.5px] font-semibold tracking-[0.75px]">Secondary Image</p>}
                getValueFromEvent={normFileImage}
                rules={[
                    {
                        required: true,
                        message: 'Please choose list secondary image of product !!!'
                    },
                ]}
                style={{
                    width: '66%',
                    marginBottom: 20
                }}
            >
                <Upload
                    accept=".png,.jpg,.jpeg,.avif,.webp,.jfif"
                    listType="picture-card"
                    fileList={secondaryImages}
                    showUploadList={{
                        showPreviewIcon: false,
                    }}
                    multiple={true}
                    onChange={handleChangeSecondaryImages}
                    beforeUpload={() => false}
                >
                    {
                        secondaryImages.length < 7
                        && <div>
                            <PlusOutlined />
                            <div
                                style={{
                                    marginTop: 8,
                                }}
                            >
                                Upload
                            </div>
                        </div>
                    }
                </Upload>
            </Form.Item>
        </Flex>
    </Form>
}
export default FormProduct