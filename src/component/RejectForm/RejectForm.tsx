import { CheckCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
// import { useTranslation } from "react-i18next";
import ResForm from "../Form/FormProvider";
import ResTextArea from "../Form/ResTextarea";
// import { useRejectIdVerificationMutation } from "../../redux/features/auth/authApi";
import { toast } from "sonner";
import ErrorResponse from "../UI/ErrorResponse";
// import { useRejectShopVerificationsMutation } from "../../redux/features/shop/shop.api"; 
import { useRejectShopVerificationsMutation } from "../../redux/features/shop/shop.api";

const RejectForm = ({
  id,
  setShowrejectModal,
  setShow,
}: {
  id: any;
  setShowrejectModal: any;
  setShow: any;
}) => {
  const [rejectFn] = useRejectShopVerificationsMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    toast.loading("rejecting...", { id: "rejectId" });
    if (!data?.reason) {
      ErrorResponse("reason is required", "rejectId");
      return;
    }

    try {
      const res = await rejectFn({
        id,
        data: { sellerComment: data.reason },
      }).unwrap();

      toast.success(res?.message, { id: "rejectId" });

      if (res.success) {
        setShowrejectModal(false);
        setShow(false);
      }
    } catch (error) {
      ErrorResponse(error, "rejectId");
    }
  };
  return (
    <ResForm onSubmit={onSubmit}>
      <ResTextArea name="reason" placeholder="write here" />
      <div className="flex items-center gap-x-2">
        <Button
          htmlType="submit"
          className="bg-primary w-full flex justify-center items-center font-600 text-18 "
          icon={<CheckCircleOutlined />}
        >
          {"Submit"}
        </Button>
      </div>
    </ResForm>
  );
};

export default RejectForm;
