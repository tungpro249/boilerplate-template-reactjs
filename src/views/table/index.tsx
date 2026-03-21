import CustomTable from "../../shared/components/Table"

const Table = () => {
    const columns = [
        {
            title: "Tên",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Giá",
            dataIndex: "price",
            key: "price",
        },
        {
            title: "Số lượng",
            dataIndex: "quantity",
            key: "quantity",
        },
    ]
    const data = [
        {
            key: "1",
            name: "Sản phẩm 1",
            price: 100000,
            quantity: 10,
        },
        {
            key: "2",
            name: "Sản phẩm 2",
            price: 200000,
            quantity: 20,
        },
        {
            key: "3",
            name: "Sản phẩm 3",
            price: 300000,
            quantity: 30,
        },
    ]
    return (
        <CustomTable
            title="Bảng"
            columns={columns}
            dataSource={data}
            searchable
            searchPlaceholder="Tìm kiếm..."
            showRefresh
            onRefresh={() => console.log("Refresh data")}
            onSearch={(value) => console.log("Search value:", value)}
        />
    )

}

export default Table