import { CalendarOutlined, DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu, MenuProps } from "antd";
import customerIcon from "../../../assets/icons/user.png";
import ETable from "../../../component/Table";
import {
  useUpdateOrderMutation,
  useGetOrderByIdQuery,
} from "../../../redux/features/order/orderApi";
import { useParams } from "react-router-dom";
import moment from "moment";
import { priceFormat } from "../../../utils/priceFormate";
import { toast } from "sonner";
import ErrorResponse from "../../../component/UI/ErrorResponse";

const InfoRow = ({ label, value }: any) =>
  value && (
    <div className="flex items-center gap-3 mb-2 text-18">
      <p>{label}</p>
      <p>{value}</p>
    </div>
  );
const OrderDetails = () => {
  const [UpdateOrder] = useUpdateOrderMutation();
  const params = useParams();
  const { data } = useGetOrderByIdQuery(params?.id);
  const orderData = data?.data || {};
  const orderItemsData = orderData?.items || [];

  const copyToClipboard = (data: string) => {
    navigator.clipboard
      .writeText(data)
      .then(() => {
        toast.success("Copied!");
      })
      .catch((err) => {
        console.log("Something went wrong", err);
      });
  };
  const columns = [
    {
      title: "Product ID",
      dataIndex: "product",
      key: "product",
      render: (data: any) => {
        return `#${data?.id}`;
      },
    },
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
      render: (data: any) => {
        return `${data?.name}`;
      },
    },

    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Amount",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (data: any) => {
        return priceFormat(Math.round(data * 0.95));
      },
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
      render: (data: any) => {
        return data? data : <p>N/A</p>;
      },
    },
    {
      title: "color",
      dataIndex: "color",
      key: "color",
      render: (data: any) => {
        return (
          <>
            {data ? (
              <div
                onClick={() => copyToClipboard(data)}
                className={`h-5 w-8 rounded border border-gray hover:cursor-pointer`}
                style={{ background: data }}
              ></div>
            ) : (
              <p>N/A</p>
            )}
          </>
        );
      },
    },
  ];

  const handelToUpdateOrderStatus = async (id: string, status: string) => {
    toast.loading("Loading...", { id: "...", duration: 3000 });

    try {
      const res = await UpdateOrder({ id, data: { status: status } }).unwrap();
      toast.success(res?.message, { id: "...", duration: 3000 });
    } catch (error) {
      ErrorResponse(error, "...");
    }
  };

  const billing = orderData?.billingDetails;
  const orderStatuses = [
    "pending",
    "processing",
    "onTheWay",
    "delivered",
    "cancelled",
  ];
  const disabledStatusMap: { [key: string]: string[] } = {
    processing: ["pending"],
    onTheWay: ["pending", "processing"],
    delivered: ["pending", "processing", "onTheWay"],
    cancelled: ["pending", "processing", "onTheWay", "delivered"],
  };
  return (
    <div>
      {/* top section */}
      <div className="flex justify-between ">
        <div>
          <div className="flex items-center gap-x-6">
            <h1 className="text-20 font-500">
              Order Id: #{orderData?.id && orderData?.id}
            </h1>
            <Dropdown
              overlay={
                <Menu>
                  {orderStatuses?.map((item: string) => (
                    <Menu.Item
                      disabled={disabledStatusMap[orderData?.status]?.includes(
                        item
                      )}
                      className={`${
                        orderData?.status === item && "bg-primary !text-white"
                      }`}
                      onClick={() =>
                        handelToUpdateOrderStatus(params?.id as string, item)
                      }
                      key={item}
                    >
                      {item}
                    </Menu.Item>
                  ))}
                  {/* <Menu.Item>Processing</Menu.Item>
                  <Menu.Item
                    onClick={() => handelToDelivered(params?.id as string)}
                  >
                    Delivered
                  </Menu.Item> */}
                </Menu>
              }
            >
              <Button className="bg-primary text-white font-500 ">
                {orderData?.status && orderData?.status} <DownOutlined />
              </Button>
            </Dropdown>
          </div>
          <div className="flex items-center  mt-2 gap-x-2">
            <CalendarOutlined />
            <div className="font-500 ">
              <p>
                {orderData?.createdAt &&
                  moment(orderData?.createdAt).format("YYYY-MM-DD HH:mm:ss")}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-start gap-x-4">
          <img src={customerIcon} />
          <div className="text-gray text-18 flex flex-col gap-y-2 ">
            <h5 className="text-black font-500 ">Customer</h5>
            <InfoRow label="Name:" value={billing?.name} />
            <InfoRow label="Email:" value={billing?.email} />
            <InfoRow label="phone:" value={billing?.phoneNumber} />
            <InfoRow
              label="Address: "
              value={
                billing?.states ??
                billing?.states + " " + "(" + billing?.zipCode ??
                billing?.zipCode + "), " + billing?.street ??
                billing?.street + ", " + billing?.country ??
                billing?.country
              }
            />
          </div>
        </div>
      </div>

      {/* payment section */}
      <div className="flex justify-between items-center bg-primary/10 p-4 text-20 mt-4 font-500">
        <div>
          <h1>Payment Info</h1>
          <p className="text-16">
            TranxId:{" "}
            <span className="text-primary">{orderData?.transactionId}</span>
          </p>
        </div>
        <h1 className="text-primary">
          Total Amount:{"  "}
          {priceFormat(Math.round(orderData?.totalAmount ?? 0))}
        </h1>
      </div>

      <div className="mt-4">
        <ETable
          column={columns}
          data={orderItemsData}
          pagination={{ pageSize: 5, total: orderItemsData?.length }}
        />
      </div>
    </div>
  );
};

export default OrderDetails;
