import { Button, Card, Flex, Form, Input, InputNumber, Table } from "antd"
import { useForm } from "antd/es/form/Form"
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import generateColumnsData from './ColumnsSizeOfProduct'

const FormSizeOfProDuct = (props) => {

    const { sizes, setSizes, openNotification } = props

    const [create, setCreate] = useState(true)

    const [formSizeOfProduct] = useForm()

    // update
    const handleUpdate = (record) => {
        setCreate(false)
        formSizeOfProduct.setFieldsValue({
            ...record
        })
    }

    // delete
    const handleDeleteSize = (record) => {
        const lstSize = sizes?.filter((item) => item.id !== record.id)
        setSizes(lstSize)
        formSizeOfProduct.resetFields()
        setCreate(true)
    }

    const onFinish = (values) => {
        if (create) {
            const checkSize = sizes?.filter((item) => item.name === values.name)

            if (checkSize.length > 0) {
                openNotification('This size is already exist !!!', 'error')
            } else {
                const size = { ...values, id: uuidv4() }
                const lstSize = [...sizes, size]
                setSizes(lstSize)
            }
        } else {
            const newSizes = sizes?.map((item) => {
                if (item.id === values.id) {
                    return values
                }
                return item
            })
            setSizes(newSizes)
            setCreate(true)
        }
        formSizeOfProduct.resetFields()
    }

    // generate columns 
    const columnSize = generateColumnsData(
        { handleUpdate: handleUpdate },
        { handleDeleteSize: handleDeleteSize }
    )

    return <Card title='Size Of Product' style={{ backgroundColor: '#ccc', marginTop: '20px' }}>
        <Form
            name='formSizeOfProduct'
            form={formSizeOfProduct}
            id='formSizeOfProduct'
            autoComplete="off"
            onFinish={onFinish}
            layout="vertical"
            className="form"
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
                    label={<p className="text-eclipse text-[16.5px] font-semibold tracking-[0.75px]">Size</p>}
                    rules={[
                        {
                            required: true,
                            message: 'Please input size !!!'
                        },
                    ]}
                    style={{
                        width: '49%',
                        marginBottom: 20
                    }}
                >
                    <InputNumber style={{ width: '100%' }} disabled={!create} />
                </Form.Item>

                <Form.Item
                    name="quantity"
                    label={<p className="text-eclipse text-[16.5px] font-semibold tracking-[0.75px]">Quantity</p>}
                    rules={[
                        {
                            required: true,
                            message: 'Please input quantity of size !!!'
                        },
                    ]}
                    style={{
                        width: '49%',
                        marginBottom: 20
                    }}
                >
                    <InputNumber style={{ width: '100%' }} />
                </Form.Item>
            </Flex>
        </Form>

        <Table
            style={{
                marginTop: 30
            }}
            columns={columnSize}
            dataSource={sizes}
            pagination={false}
            rowKey='id'
        />
        <Button type='primary' htmlType="submit" form="formSizeOfProduct" style={{ marginTop: 20 }}>{create ? 'Add' : 'Update'}</Button>
    </Card>
}

export default FormSizeOfProDuct