import { Col, Row } from "antd";
import icon1 from "../../assets/icons/AdminDashboard/3.png";

const VendorList = ({ data }: any) => {
  const incomes = [
    {
      title: "Total Vendor",
      amount: data?.data?.length ?? 0,
      icon: icon1,
    },
  ];
  return (
    <Row gutter={[16, 16]}>
      {incomes.map((item, index) => (
        <Col key={index} span={6}>
          <div className="bg-secondary py-6 px-4 rounded">
            <div className="flex justify-between">
              <div>
                <img src={item.icon} alt="" />
              </div>
              <div>
                <h1 className="text-32 font-600 text-primary text-end">
                  {item.amount}
                </h1>
                <h1 className="text-24 font-600 text-gray">{item.title}</h1>
              </div>
            </div>
          </div>
        </Col>
      ))}
    </Row>
  );
};

export default VendorList;
