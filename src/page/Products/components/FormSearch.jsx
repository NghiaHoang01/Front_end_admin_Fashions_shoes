import { Checkbox, Flex, Form, Input, InputNumber, Radio, Select } from "antd"
import { LIST_COLORS } from "constant/Variable";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Capitalize } from "utils/Capitlalize";
import { getAllBrandsAsync, getAllChildCategoriesByParentCategoryIdAsync, getAllParentCategoriesByBrandAsync } from "../ProductsSlice";

const FormSearch = (props) => {

    const { formSearchProduct, hiddenColumn, setHiddenColumn, setPaging } = props

    const [brands, setBrands] = useState([])

    const [parentCategories, setParentCategories] = useState([])

    const [childCategories, setChildCategories] = useState([])

    const dispatch = useDispatch()


    const [showFormSearch, setShowFormSearch] = useState(false)

    // form
    const onFinish = (values) => {
        setPaging({
            ...values,
            pageIndex: 1,
            pageSize: 10
        })
    };

    const onReset = () => {
        setPaging({
            pageIndex: 1,
            pageSize: 10
        })
    }

    // brand
    const getBrands = async () => {
        const response = await dispatch(getAllBrandsAsync())
        setBrands(response.payload.map((item) => {
            return {
                value: item.id,
                label: Capitalize(item.name.split(' ')).toString().replaceAll(',', ' ')
            }
        }))
    }

    const handleChangeBrand = (value) => {
        formSearchProduct.resetFields(['parentCategoryId', 'childCategoryId'])
        setParentCategories([])
        setChildCategories([])
        getParentCategoryByBrand({ brandId: value })
    };

    // parent category
    const getParentCategoryByBrand = async (value) => {
        const response = await dispatch(getAllParentCategoriesByBrandAsync(value))
        setParentCategories(response.payload.map((item) => {
            return {
                value: item.id,
                label: Capitalize(item.name.split(' ')).toString().replaceAll(',', ' ')
            }
        }))
    }

    const handleChangeParentCategory = (value) => {
        formSearchProduct.resetFields(['childCategoryId'])
        setChildCategories([])
        getChildCategoryByParentCategory({ parentCategoryId: value })
    }


    // child category
    const getChildCategoryByParentCategory = async (value) => {
        const response = await dispatch(getAllChildCategoriesByParentCategoryIdAsync(value))
        setChildCategories(response.payload.map((item) => {
            return {
                value: item.id,
                label: Capitalize(item.name.split(' ')).toString().replaceAll(',', ' ')
            }
        }))
    }

    // checkbox
    const onChangeSearch = (e) => {
        setShowFormSearch(e.target.checked)
    };

    //radio
    const onChangeRadio = (e) => {
        setHiddenColumn(e.target.value);
    };

    useEffect(() => {
        getBrands()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <>
        <Form
            name="formSearchProduct"
            form={formSearchProduct}
            id={formSearchProduct}
            onFinish={onFinish}
            onReset={onReset}
            autoComplete="off"
            className={`form-search form ${showFormSearch && 'show'}`}
            layout="vertical"
        >
            <Flex wrap="wrap" justify='space-between'>
                <Form.Item
                    label={<p className="text-eclipse text-[16.5px] tracking-[0.75px] font-semibold">Name</p>}
                    name="name"
                    style={{
                        width: 300,
                        marginBottom: 10
                    }}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label={<p className="text-eclipse text-[16.5px] tracking-[0.75px] font-semibold">Brand</p>}
                    name="brandId"
                    style={{
                        width: 300,
                        marginBottom: 10
                    }}
                >
                    <Select
                        onChange={handleChangeBrand}
                        options={brands}
                    />
                </Form.Item>

                <Form.Item
                    label={<p className="text-eclipse text-[16.5px] tracking-[0.75px] font-semibold">Parent Category</p>}
                    name="parentCategoryId"
                    style={{
                        width: 300,
                        marginBottom: 10
                    }}
                >
                    <Select
                        onChange={handleChangeParentCategory}
                        options={parentCategories}
                    />
                </Form.Item>

                <Form.Item
                    label={<p className="text-eclipse text-[16.5px] tracking-[0.75px] font-semibold">Child Category</p>}
                    name="childCategoryId"
                    style={{
                        width: 300,
                        marginBottom: 10
                    }}
                >
                    <Select
                        options={childCategories}
                    />
                </Form.Item>
            </Flex>

            <Flex wrap="wrap" justify='space-between'>
                <Form.Item
                    label={<p className="text-eclipse text-[16.5px] tracking-[0.75px] font-semibold">Color</p>}
                    name="color"
                    style={{
                        width: 300,
                    }}
                >
                    <Select
                        options={LIST_COLORS}
                    />
                </Form.Item>

                <Form.Item
                    label={<p className="text-eclipse text-[16.5px] tracking-[0.75px] font-semibold">Sale %</p>}
                    name="discountedPercent"
                    style={{
                        width: 300,
                        margin: 0
                    }}
                >
                    <InputNumber
                        style={{ width: '100%' }}
                        min={0}
                        max={100} />
                </Form.Item>

                <Form.Item
                    label={<p className="text-eclipse text-[16.5px] tracking-[0.75px] font-semibold">Create By</p>}
                    name="createBy"
                    style={{
                        width: 300,
                        margin: 0
                    }}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label={<p className="text-eclipse text-[16.5px] tracking-[0.75px] font-semibold">Update By</p>}
                    name="updateBy"
                    style={{
                        width: 300,
                        margin: 0
                    }}
                >
                    <Input />
                </Form.Item>
            </Flex>
        </Form>

        <div className='mt-1 w-full'>
            <Flex justify='space-between' align='center'>
                <div>
                    <button type="reset" form={formSearchProduct} className={`custom-btn w-[110px] px-5 py-[5px] mr-3 text-[14px] rounded-[8px] ${!showFormSearch && 'hidden'}`}>Reset</button>
                    <button type="submmit" form={formSearchProduct} className={`custom-btn w-[110px] px-7 py-[5px] mr-3 text-[14px] rounded-[8px] ${!showFormSearch && 'hidden'}`}>Search</button>
                    <Checkbox onChange={onChangeSearch} style={{ fontSize: '16px', fontWeight: '600' }}>
                        Search product
                    </Checkbox>
                </div>

                <Radio.Group onChange={onChangeRadio} value={hiddenColumn} style={{ fontWeight: '600' }}>
                    <Radio style={{ fontSize: '16px' }} value={true}>Reduce</Radio>
                    <Radio style={{ fontSize: '16px' }} value={false}>Full Column</Radio>
                </Radio.Group>
            </Flex>
        </div>
    </>
}

export default FormSearch