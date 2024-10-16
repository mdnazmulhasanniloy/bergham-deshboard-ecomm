import moment from "moment";
import { useState } from "react";
import AdminEarningCard from "../../../component/AdminEarningCard";
import EModal from "../../../component/Modal/Modal";
import ETable from "../../../component/Table";
import { useAllEarningsQuery } from "../../../redux/features/income/income.api";
import { priceFormat } from "../../../utils/priceFormate";
import EarningDetails from "./EarningDetails";

const AdminEarning = () => {
  const {
    data: incomeData,
    isLoading,
    isFetching,
  } = useAllEarningsQuery({});
  const [show, setshow] = useState(false);
  const data = incomeData?.data || {
    todayIncome: 0,
    totalIncome: 0,
    allTransitions: [],
  };
  console.log("🚀 ~ AdminEarning ~ data:", data)
  const columns = [
    {
      title: "Order ID",
      dataIndex: "id",
      key: "id",
      render: (data: any) => {
        return "#"+data;
      },
    },
    {
      title: "Transaction ID",
      dataIndex: "transactionId",
      key: "transactionId",
      render: (data: any) => {
        return data;
      },
    },
    {
      title: "Customer Name",
      dataIndex: "user",
      key: "user",
      render: (data: any) => {
        return `${data?.name ?? " " }`;
      },
    },
    {
      title: "Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (data: any) => {
        return priceFormat(data);
      },
    },
    {
      title: "Commission",
      dataIndex: "adminPercentage",
      key: "adminPercentage",
      render: (data: any) => {
        return priceFormat(data);
      },
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (data: any) => {
        return moment(data).format("LLL");
      },
    },
    // {
    //   title: "Action",
    //   dataIndex: "action",
    //   key: "action",
    //   render: () => (
    //     <div className="flex items-center gap-x-2">
    //       <EyeOutlined
    //         onClick={() => setshow((prev) => !prev)}
    //         className="text-primary text-20 cursor-pointer"
    //       />
    //     </div>
    //   ),
    // },
  ];
  

  return (
    <div>
      <AdminEarningCard data={data} />
      <EModal
        title="Order Details"
        setShowModal={setshow}
        showModal={show}
        width={1000}
      >
        <EarningDetails />
      </EModal>

      <div className="mt-4">
        <ETable
          loading={isLoading || isFetching}
          column={columns}
          data={data?.allTransitions || []}
          pagination={{
            pageSize: 10,
            total: data?.allTransitions?.length || 0,
          }}
        />
      </div>
    </div>
  );
};

export default AdminEarning;
