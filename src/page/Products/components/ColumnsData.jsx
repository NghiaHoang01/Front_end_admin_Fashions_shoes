import { Popconfirm, Tag } from "antd"
import { Capitalize } from "utils/Capitlalize"
import { ConvertDate } from "utils/ConvertDate"

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ paging },
    { hiddenColumn },
    { handleListImageOfProduct },
    { handleUpdateProduct },
    { handleDeleteProduct },
    { deleteSome }) => {
    return [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            disabled: true
        },
        {
            title: 'STT',
            dataIndex: 'STT',
            key: 'STT',
            render: (_, record, index) => {
                return <p>{((paging.pageIndex - 1) * paging.pageSize) + index + 1}</p>
            },
            width: 65,
            align: 'center'
        }, {
            title: 'Create at',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (_, record) => <p>{ConvertDate(record.createdAt)}</p>,
            width: 110,
            align: 'center'
        }, {
            title: 'Update at',
            dataIndex: 'updateAt',
            key: 'updateAt',
            render: (_, record) => { record.updateAt !== null && <p>{ConvertDate(record.updateAt)}</p> },
            width: 115,
            align: 'center',
            hidden: hiddenColumn
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: 180,
            ellipsis: true
        }, {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            width: 150,
            ellipsis: true,
            hidden: hiddenColumn
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            ellipsis: true,
            width: 220
        }, {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            width: 120,
            align: 'center',
            render: (_, record) => <p>{record.price.toLocaleString()}<sup>đ</sup></p>
        }, {
            title: 'Discounted %',
            dataIndex: 'discountedPercent',
            key: 'discountedPercent',
            width: 120,
            align: 'center',
            render: (_, record) => <Tag color='#a8020a' key={record.dataIndex} style={{ borderRadius: '15px', width: 50, padding: 2, textAlign: 'center' }}>{record.discountedPercent}%</Tag>
        }, {
            title: 'Discounted Price',
            dataIndex: 'discountedPrice',
            key: 'discountedPrice',
            width: 150,
            align: 'center',
            render: (_, record) => <p>{record.discountedPrice.toLocaleString()}<sup>đ</sup></p>
        }, {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            width: 100,
            align: 'center',
            hidden: hiddenColumn
        }, {
            title: 'Brand',
            dataIndex: 'brandProduct',
            key: 'brandProduct',
            width: 100,
            align: 'center',
            render: (item) => <p>{Capitalize(item['name'].split(' ')).toString().replaceAll(',', ' ')}</p>
        }, {
            title: 'Parent Category',
            dataIndex: 'parentCategoryOfProduct',
            key: 'parentCategoryOfProduct',
            width: 150,
            align: 'center',
            hidden: hiddenColumn,
            render: (item) => <p>{Capitalize(item['name'].split(' ')).toString().replaceAll(',', ' ')}</p>
        }, {
            title: 'Child Category',
            dataIndex: 'childCategoryOfProduct',
            key: 'childCategoryOfProduct',
            width: 150,
            hidden: hiddenColumn,
            align: 'center',
            render: (item) => <p>{Capitalize(item['name'].split(' ')).toString().replaceAll(',', ' ')}</p>
        }, {
            title: 'Color',
            dataIndex: 'color',
            key: 'color',
            width: 100,
            hidden: hiddenColumn,
            render: (_, record) => <p>{Capitalize(record.color.split(' ')).toString().replaceAll(',', ' ')}</p>
        },
        {
            title: 'Create By',
            dataIndex: 'createdBy',
            key: 'createdBy',
            width: 200,
            hidden: hiddenColumn,
        }, {
            title: 'Update By',
            dataIndex: 'updateBy',
            key: 'updateBy',
            width: 200,
            hidden: hiddenColumn,
        }, {
            title: 'Action',
            key: 'action',
            width: 140,
            align: 'center',
            render: (_, record) => (
                <div className="text-[21px] flex items-center">
                    <i
                        title="Image"
                        className="fa-solid fa-image cursor-pointer mx-2 text-green-500 duration-150 ease-linear hover:text-green-300"
                        onClick={() => handleListImageOfProduct(record)}>
                    </i>
                    <i
                        title="Update"
                        className="fa-solid fa-pen-to-square cursor-pointer mx-2 text-orange-500 hover:text-orange-300"
                        onClick={() => handleUpdateProduct(record)}>
                    </i>
                    <Popconfirm
                        title="Delete the task"
                        description="Are you sure to delete this product?"
                        onConfirm={() => handleDeleteProduct(record.id)}
                        okText="Yes"
                        cancelText="No"
                        disabled={deleteSome}
                    >
                        <i
                            title="Delete"
                            className={`fa-solid fa-trash-can ${!deleteSome ? 'cursor-pointer hover:text-red-400' : 'cursor-no-drop'} mx-2 text-red-custom `}></i>
                    </Popconfirm>
                </div>
            ),
        },
    ].filter(item => !item.hidden && !item.disabled)
}