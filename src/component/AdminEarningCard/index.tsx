import { Col, Row } from "antd";
import icon1 from "../../assets/icons/adminEarning/1.png";
import icon2 from "../../assets/icons/adminEarning/2.png";
import { priceFormat } from "../../utils/priceFormate";

const AdminEarningCard = ({ data }: any) => {
   
  const incomes = [
    {
      title: "Today Income",
      amount: priceFormat(data?.todayIncome),
      icon: icon1,
    },
    {
      title: "Total Income",
      amount: priceFormat(data?.totalIncome),
      icon: icon2,
    },
  ];
  return (
    <Row gutter={[16, 16]}>
      {incomes.map((item, index) => (
        <Col key={index} span={6}>
          <div className="bg-primary/10 py-6 px-4 rounded">
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

export default AdminEarningCard;
