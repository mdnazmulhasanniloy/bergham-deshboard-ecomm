import { Button, Dropdown, Input, Menu, Space } from "antd";
import moment, { updateLocale } from "moment";
import { useNavigate } from "react-router-dom";
import OrderCard from "../../../component/OrderCard/OrderCard";
import ETable from "../../../component/Table"; 
import firstLetterUppercase from "../../../utils/firstLetterUppercase";
import { useGetallOrdersQuery } from "../../../redux/features/order/orderApi";
import { useState } from "react";
import { FilterOutlined } from "@ant-design/icons";
import { toast } from "sonner";

const Orders = () => {
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState<string| null>("All Data")
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const navigate = useNavigate();
  const query:Record<string, any> ={} 
  query["limit"] = limit;
  query["page"] = page;
  query["paymentStatus"] = 'paid';
  if(status && status !== "All Data"){
    query["status"] = status;
  }
  query["searchTerm"] = search;
  const { data: orderRes } = useGetallOrdersQuery(query);
  
  const ordersData = orderRes?.data?.data || [];  
  const copyToClipboard = (data:string) => {
    navigator.clipboard.writeText(data)
      .then(() => {
       toast.success("Copied!")
      })
      .catch(err => {
        console.log('Something went wrong', err);
      });
  };
  const columns = [
    {
      title: "Order Id",
      dataIndex: "id",
      key: "id",
      render: (val: any) => `#${val}`,
    },
    {
      title: "Customer Name",
      dataIndex: "billingDetails",
      key: "billingDetails",
      render: (data: any) => { 
        return data?.name;
      },
    },
    {
      title: "Total Product",
      dataIndex: "items",
      key: "items",
      render: (data: any) => {
        return data?.length;
      },
    },
    {
      title: "Order Status",
      dataIndex: "status",
      key: "status",
      render: (val: any) => firstLetterUppercase(val),
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (val: any) => firstLetterUppercase(val),
    },
    {
      title: "Time and Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (data: any) => moment(data).format("LLL"),
    },
    {
      title: "Transition Id",
      dataIndex: "transactionId",
      key: "transactionId",
      render: (data: any) => <p onClick={()=>copyToClipboard(data)} className="hover:cursor-pointer hover:text-[#95de64]">{data}</p>,
    },
    {
      title: "Action",
      key: "action",
      render: (value: any) => {
        return (
          <Space size="middle">
            <Button
              onClick={() => navigate(`/admin/order/details/${value._id}`)}
            >
              Details
            </Button>
          </Space>
        );
      },
    },
  ];

const orderStatuses = [
  'All Data',
    'pending',
    'processing',
    'onTheWay',
    'delivered',
    'cancelled',
  ];
  return (
    <div>
      {/* <OrderCard data={ordersData} /> */}
      <div className="mt-10">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-20 font-500 text-gray">{"Order List"}</h1>
        <div className="flex gap-x-2">
          <Input.Search
            style={{ width: 304 }}
            placeholder={"Search"}
            allowClear
            onChange={(e) => setSearch(e.target.value)}
          />

          <Dropdown
            overlay={
              <Menu>   
             {orderStatuses?.map((item:string)=> <Menu.Item
                      className={`${(status === item )  && "bg-primary !text-white"}`}
                      onClick={() => setStatus( item)}
                      key={item}
                    >
                      {item.toUpperCase()}
                    </Menu.Item>)  
              }
              </Menu>
            }
          >
            <Button
              className="bg-primary text-white font-500 "
              icon={<FilterOutlined />}
            >
              {"Filter"}
            </Button>
          </Dropdown>

         
       
        </div>
      </div>
        <ETable
          column={columns}
          data={ordersData}
          pagination={{ pageSize: limit ?? 10, total: orderRes?.data?.meta?.total ?? 0}}
        />
      </div>
    </div>
  );
};

export default Orders;
