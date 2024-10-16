import React from "react";
import { MdOutlineMoneyOff, MdPriceCheck } from "react-icons/md";

export default function VendorRefundCard({ data }:any) {
  console.log("🚀 ~ VendorRefundCard ~ data:", data);
  return (
    <div className="flex gap-x-6">
      <div className="flex font-500 text-20 gap-x-6 rounded text-white bg-[#FE6201] items-center py-3 px-6">
        <div className="flex items-center gap-x-2">
          <MdPriceCheck size={25} />
          <h1>Accepted Request</h1>
        </div>
        <h1>20</h1>
      </div>
      <div className="flex font-500 text-20 gap-x-6 rounded text-white bg-[#FE6201] items-center py-3 px-6">
        <div className="flex items-center gap-x-2">
          <MdOutlineMoneyOff size={25} />
          <h1>Rejected Request</h1>
        </div>
        <h1>30</h1>
      </div>
    </div>
  );
}
