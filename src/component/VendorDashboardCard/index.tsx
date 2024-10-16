/* eslint-disable @typescript-eslint/no-explicit-any */

import { Col, Row } from "antd"; // Importing Row and Col from Ant Design
import icon1 from "../../assets/icons/vendorDashboard/1.png";
import icon2 from "../../assets/icons/vendorDashboard/2.png";

const VendorDashboardCard = ({ totalEarning, totalProducts }: any) => {
  const data = [
    {
      icon: icon2,
      data: totalProducts,
      title: "Total Products",
    },
    {
      icon: icon1,
      data: totalEarning ? `$${totalEarning}` : "0",
      title: "Total Earning",
    },
  ];

  return (
    <Row gutter={[16, 16]}>
      {data.map((item, index) => (
        <Col key={index} span={6} style={{}}>
          <div className="bg-secondary py-6 px-4 rounded">
            <div className="flex justify-between">
              <div>
                <img src={item.icon} alt="" />
              </div>
              <div>
                <h1 className="text-32 font-600 text-primary text-end">
                  {item?.data}
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
export default VendorDashboardCard;
