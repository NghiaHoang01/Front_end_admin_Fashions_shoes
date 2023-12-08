import { Popconfirm } from "antd"

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ handleUpdate },
    { handleDeleteSize }) => {
    return [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            hidden: true
        },
        {
            title: 'Size',
            dataIndex: 'name',
            key: 'name',
            align: 'center',
            width: 200
        }, {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            align: 'center',
            width: 200
        }, {
            title: 'Action',
            key: 'action',
            align: 'center',
            render: (_, record) => (
                <div className="text-[21px] flex items-center justify-center">
                    <i
                        className="fa-solid fa-pen-to-square cursor-pointer mx-2 text-green-500 hover:text-green-300" title="Update"
                        onClick={() => handleUpdate(record)}
                    ></i>
                    <Popconfirm
                        title="Delete the task"
                        description="Are you sure to delete this size ?"
                        onConfirm={() => handleDeleteSize(record)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <i className="fa-solid fa-trash-can cursor-pointer mx-2 text-red-custom hover:text-red-400" title="Delete"></i>
                    </Popconfirm>
                </div>
            ),
        },
    ].filter((item) => !item.hidden)
}