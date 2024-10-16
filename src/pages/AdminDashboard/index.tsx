import { UploadOutlined } from "@ant-design/icons";
import { Button, Col, DatePicker, Row, Upload } from "antd";
import AdminDashboardCard from "../../component/AdminDashboardCard/index";
import EarningBarChart from "../../component/EarningBarChart";
import ETable from "../../component/Table";
import { useState } from "react";
import ErrorResponse from "../../component/UI/ErrorResponse";
import {
  useDeleteBannerMutation,
  useGetContentsQuery,
  useUpdateContentMutation,
} from "../../redux/features/content/contentApi";
import { RiDeleteBin5Line } from "react-icons/ri";
import ResConfirm from "../../component/UI/PopConfirm";
import { toast } from "sonner"; 
import moment from "moment";
import dayjs from "dayjs";
import showImage from "../../utils/showImage";
import { useGetDashboardDataQuery } from "../../redux/features/income/income.api";
import { TUser } from "../../redux/features/auth/authSlice";

const AdminDashboard = () => {
  const [year, setYear] = useState(moment().format("yyyy"));
  const [UploadBanner, { isLoading }] = useUpdateContentMutation();
  const [DeleteBanner, { isLoading: isDeleteLoading }] =
    useDeleteBannerMutation();
  const [fileList, setFileList] = useState([]);
  const { data: data } = useGetContentsQuery({});

  const query: Record<string, any> = {};
  if (year) query["year"] = year;
  const { data: dashboardRes } = useGetDashboardDataQuery(query);
   console.log("🚀 ~ AdminDashboard ~ dashboardRes:", dashboardRes)
   
  
  const dashBoardData :{
    newUsers:TUser[],
    toDayIncome:number,
    totalIncome:number,
    totalProducts:number,
    totalUsers:number
    monthlyIncome:any
   
  }=dashboardRes?.data 
  const columns = [
    {
      title: "Full Name",
      dataIndex: "name",
      key: "name",
      render: (data: any) => {
        return `${data?.name ?? ""}`;
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Joining Date",
      dataIndex: "createdAt",
      key: "date",
      render: (data: any) => {
        return moment(data).format("LLL");
      },
    },
    {
      title: "Type",
      dataIndex: "role",
      key: "role",
    },
  ];

  const handelToUpload = async () => {
    toast.loading("Uploading...", { id: "banner" });
    if (fileList?.length < 1) {
      toast.error("Please select a file to upload", {
        id: "banner",
        duration: 3000,
      });
      return;
    }
    if (fileList?.length + data?.data?.data[0]?.banner?.length > 5) {
      toast.error("you can select overall 5 image", {
        id: "banner",
        duration: 3000,
      });
      return;
    }

    try {
      const formData = new FormData();

      const banners = fileList?.map((file: any) => file.originFileObj);

      banners.forEach((banner) => {
        formData.append("banner", banner);
      });

      const res = await UploadBanner(formData).unwrap();

      toast.success(res?.message, { id: "banner" });
      if (res?.success) {
        setFileList([]);
      }
    } catch (error) {
      console.log(error);
      ErrorResponse(error, "bannerUpload");
    } finally {
      toast.dismiss("banner");
    }
  };

  const handleDeleteBanner = async (key: string) => {
    toast.loading("deleting...", { id: "banner" });
    try {
      const res = await DeleteBanner(key).unwrap();
      toast.success(res?.message, { id: "banner" });
    } catch (error) {
      ErrorResponse(error, "bannerUpload");
    }
  };

  return (
    <div>
      <AdminDashboardCard incomes={dashBoardData} />
      <Row className="mt-4" gutter={[16, 16]}>
        <Col span={16}>
          <div className="bg-primary/10 p-4 mb-4">
            <div className="flex justify-between items-center mb-4b ">
              <h1>Earning</h1>
              <DatePicker
                onChange={(date, dateString) =>
                  setYear(moment(dateString).format(" ") as string)
                }
                picker="year"
                defaultValue={dayjs(dayjs(), "YYYY")}
              />
            </div>
            <EarningBarChart monthlyIncome={dashBoardData?.monthlyIncome} />
          </div>

          <div className="mt-8">
            <p className="text-primary text-20 font-600 mb-4">New Users</p>
            <ETable
              column={columns}
              data={dashBoardData?.newUsers || []}
              pagination={{
                pageSize: 5,
                total: dashBoardData?.newUsers.length || 0,
              }}
            />
          </div>
        </Col>
        <Col span={8} className="flex justify-center">
          <div className="flex flex-col items-center justify-start gap-6">
            <h2 className="text-20 flex self-start text-primary font-600">
              Home Page Banners
            </h2>
            {data?.data?.data[0]?.banner?.length > 0 &&
              data?.data?.data[0]?.banner?.map((item: any) => (
                <div
                  className="w-full h-[150px] relative group overflow-hidden"
                  key={item?.key}
                >
                  <img
                    alt="example"
                    style={{ height: "100%", width: "100%" }}
                    src={showImage(item?.url)}
                  />
                  <div className="group-hover:inset-0 top-[-600px] transition-all duration-500 ease-in-out h-full w-full absolute bg-[rgba(5,5,5,0.43)] flex  items-center justify-center">
                    <ResConfirm handleOk={() => handleDeleteBanner(item?.key)}>
                      <button
                        disabled={isDeleteLoading}
                        className="px-4 py-4 bg-[#FF0000] text-white  rounded-full"
                      >
                        <RiDeleteBin5Line size={32} />
                      </button>
                    </ResConfirm>
                  </div>
                </div>
              ))}

            <Upload
              onChange={({ fileList }: any) => setFileList(fileList)}
              listType="picture"
              fileList={fileList}
            >
              <div className="border text-18 font-500 text-primary border-primary rounded flex flex-col items-center px-[200px] py-[20px] cursor-pointer ">
                <UploadOutlined />
                <button>Upload</button>
              </div>
            </Upload>
            {fileList?.length > 0 && (
              <Button
                onClick={handelToUpload}
                disabled={fileList?.length === 0 || isLoading}
                className={`bg-primary text-white w-full py-5 text-lg font-700 hover:bg-white hover:text-primary border-2 border-primary transition-all duration-300 cursor-pointer ${
                  fileList?.length === 0 && "cursor-not-allowed"
                }`}
              >
                Submit
              </Button>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;
