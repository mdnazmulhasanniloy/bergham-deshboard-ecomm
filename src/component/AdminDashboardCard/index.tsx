/* eslint-disable @typescript-eslint/no-explicit-any */

import { Col, Row } from "antd"; // Importing Row and Col from Ant Design
import icon1 from "../../assets/icons/AdminDashboard/1.png";
import icon2 from "../../assets/icons/AdminDashboard/2.png";
import icon3 from "../../assets/icons/AdminDashboard/3.png";
import icon4 from "../../assets/icons/AdminDashboard/4.png";
import { priceFormat } from "../../utils/priceFormate"; 

 

const AdminDashboardCard = ({ incomes }:any) => {
  const data = [
    {
      icon: icon1,
      data: priceFormat(incomes?.toDayIncome || 0),
      title: "Today Income",
    },
    {
      icon: icon2,
      data: priceFormat(incomes?.totalIncome || 0),
      title: "Total Income",
    },
    {
      icon: icon3,
      data: incomes?.totalProducts || 0,
      title: "Total Products",
    },
    {
      icon: icon4,
      data: incomes?.totalUsers || 0,
      title: "Total Buyers",
    },
  ];

  return (
    <Row gutter={[16, 16]}>
      {data.map((item, index) => (
        <Col key={index} span={6}>
          <div className="bg-primary/10 py-6 px-4 rounded">
            <div className="flex justify-between">
              <div>
                <img src={item.icon} alt="" />
              </div>
              <div>
                <h1 className="text-32 font-600 text-primary text-end">
                  {item.data}
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
export default AdminDashboardCard;
