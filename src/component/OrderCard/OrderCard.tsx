/* eslint-disable @typescript-eslint/no-explicit-any */

import { Col, Row } from "antd"; // Importing Row and Col from Ant Design
import order from "../../assets/icons/vendorDashboard/shopping_bag_24dp_5F6368_FILL0_wght300_GRAD0_opsz24 1.svg";

const OrderCard = ({ data: ordersData }: any) => { 
  const data = [
    {
      icon: order,
      data: ordersData?.queue,
      title: "Queued Orders",
    },
    {
      icon: order,
      data: ordersData?.delivered,
      title: "Delivered Orders",
    },
    {
      icon: order,
      data: ordersData?.cancelled,
      title: "Cancelled Orders",
    },
  ];

  return (
    <Row gutter={[16, 16]}>
      {data.map((item, index) => (
        <Col key={index} span={6}>
          <div className="bg-primary/10 py-6 px-4 rounded">
            <div className="flex justify-between">
              <div className="bg-primary flex items-center justify-center px-4 py-4 rounded-full">
                <img src={item.icon} alt="" className="full" />
              </div>
              <div>
                <h1 className="text-32 font-600 text-primary text-end">
                  {item.data}
                </h1>
                <h1 className="text-16 lg:text-20 xl:text-24 font-600 text-gray">
                  {item.title}
                </h1>
              </div>
            </div>
          </div>
        </Col>
      ))}
    </Row>
  );
};
export default OrderCard;
