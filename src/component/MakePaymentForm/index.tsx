/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "antd";
import { toast } from "sonner";
import {
  useGetSingleWalletQuery,
  useSentVendorAmountMutation,
} from "../../redux/features/wallet/walletApi";
import { walletValidationSchema } from "../../schema/wallet.schema";
import EForm from "../Form/FormProvider";
import EInput from "../Form/ResInput";
import ESelect from "../Form/ResSelect";
import ErrorResponse from "../UI/ErrorResponse";

const MakePaymentForm = ({ id, setshow }: any) => {
  const { data: walletData } = useGetSingleWalletQuery(id);
  const [sendAmount] = useSentVendorAmountMutation();
  const onSubmit = async (data: any) => {
    const toastId = toast.loading("Sending..");
    if (data?.amount > walletData?.data?.due) {
      toast.error("Influence balance", { id: toastId, duration: 2000 });

      return;
    }
    try {
      await sendAmount({ id, body: data }).unwrap();
      toast.success("Amount sent successfully", {
        id: toastId,
        duration: 2000,
      });
      setshow((prev: boolean) => !prev);
    } catch (error) {
      ErrorResponse(error, toastId);
    }
  };

  const options = [
    { label: "Bank", value: "Bank" },
    { label: "Hand Cash", value: "cash" },
    { label: "Others", value: "others" },
  ];

  return (
    <div>
      <EForm
        onSubmit={onSubmit}
        resolver={zodResolver(walletValidationSchema.walletSchema)}
      >
        <EInput
          size="large"
          label="Enter Amount"
          name="amount"
          type="number"
          placeholder="enter amount"
        />
        <EInput
          size="large"
          label="Enter Perchantage"
          name="percentage"
          type="number"
          placeholder="enter perchantage"
        />
        <ESelect
          size="large"
          options={options}
          label="Select Method"
          name="method"
          placeholder="select method"
        />
        <div className="flex gap-x-2 font-600 text-20 mb-4">
          <p>Available Balance:</p>
          <p className="text-primary">${walletData?.data?.due}</p>
        </div>
        <Button
          disabled={walletData?.data?.due <= 0}
          htmlType="submit"
          className="bg-primary text-white font-600 h-[36px] w-full"
        >
          Make Payment
        </Button>
      </EForm>
    </div>
  );
};

export default MakePaymentForm;
