import { CheckCircleOutlined } from "@ant-design/icons";
import { Button, InputNumber } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
// import { useTranslation } from "react-i18next";
import ResForm from "../Form/FormProvider";
import ResTextArea from "../Form/ResTextarea";
// import { useRejectIdVerificationMutation } from "../../redux/features/auth/authApi";
import { toast } from "sonner";
import ErrorResponse from "../UI/ErrorResponse";
import { useApprovedRefundRequestMutation } from "../../redux/features/refund/refund.Api";
import EInput from "../Form/ResInput";

const ApprovedForm = ({
  modalData,
  setShowrejectModal,
  setOpen,
}: {
  modalData: any;
  setShowrejectModal: any;
  setOpen: any;
}) => {
  const [ApprovedRequestFn] = useApprovedRefundRequestMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    toast.loading("rejecting...", { id: "approved" }); 
    if (!data?.amount) {
      ErrorResponse("amount is required", "approved");
      return;
    }

    try {
      const res = await ApprovedRequestFn({
        id: modalData?.shopWiseOrder?._id,
        data,
      }).unwrap();

      toast.success(res?.message, { id: "approved" });
      if (res.success) {
        setShowrejectModal(false);
        setOpen(false);
      }
    } catch (error) {
      ErrorResponse(error, "approved");
    }
  };
  const DefaultValue = {
    amount: modalData?.shopWiseOrder?.totalAmount,
  };
  return (
    <ResForm onSubmit={onSubmit} defaultValues={DefaultValue}>
      {/* <ResTextArea name="reason" placeholder="write here" /> */}
      <EInput type="number" name="amount" placeholder="Enter Refund Amount" />
      <div className="flex items-center gap-x-2">
        <Button
          htmlType="submit"
          className="bg-primary text-white w-full flex justify-center items-center font-600 text-18 "
          icon={<CheckCircleOutlined />}
        >
          {"Submit"}
        </Button>
      </div>
    </ResForm>
  );
};

export default ApprovedForm;
