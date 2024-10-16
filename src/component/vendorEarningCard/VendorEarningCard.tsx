import { MdAttachMoney } from "react-icons/md";
import { priceFormat } from "../../utils/priceFormate";

const VendorEarningCard = ({ vendorEarnings }: any) => {
  return (
    <div className="flex gap-x-6">
      <div className="flex font-500 text-20 gap-x-6 rounded text-white bg-[#FE6201] items-center py-3 px-6">
        <div className="flex items-center">
          {/* <MdAttachMoney /> */}
          <h1>Today's Earning</h1>
        </div>
        <h1>{priceFormat(vendorEarnings?.toDayIncome)}</h1>
      </div>
      <div className="flex font-500 text-20 gap-x-6 rounded text-white bg-[#FE6201] items-center py-3 px-6">
        <div className="flex items-center">
          {/* <MdAttachMoney /> */}
          <h1>Total Earning</h1>
        </div>
        <h1>{priceFormat(vendorEarnings?.totalIncome)}</h1>
      </div>
    </div>
  );
};

export default VendorEarningCard;
