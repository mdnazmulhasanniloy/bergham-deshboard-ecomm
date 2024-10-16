/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { GiConfirmed } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import EForm from "../../component/Form/FormProvider";
import EInput from "../../component/Form/ResInput";
import ErrorResponse from "../../component/UI/ErrorResponse";
import {
  useChangePasswordMutation,
  useForgotPasswordMutation,
  useProfileQuery,
} from "../../redux/features/auth/authApi";
import { setToken } from "../../redux/features/otp/otpSlice";
import { useAppDispatch } from "../../redux/hooks";
import { authValidationSchema } from "../../schema/auth.schema";

interface SubmitProps {
  currentPassword: string;
  newPassword: string;
  oldPassword: string;
}
const ChangePasswordFrom = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [changePassword] = useChangePasswordMutation();
  const { data: profile } = useProfileQuery(undefined);
  const [forgotPassword] = useForgotPasswordMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast("Changing......");
    try {
      const res: any = await changePassword(data).unwrap();
      toast.success("Password changed successfully", {
        id: toastId,
        duration: 2000,
      });
    } catch (err) {
      ErrorResponse(err, toastId);
    }
  };

  const handleForgotPassword = async () => {
    const toastId = toast.loading("Sending Otp");
    try {
      const res = await forgotPassword(profile?.data).unwrap(); 
      toast.success("An otp sent to your email address", {
        id: toastId,
        duration: 2000,
      });
      dispatch(setToken(res?.data));
      sessionStorage.setItem("token", res?.data?.token);
      navigate(`/${profile?.data?.role}/otp`);
    } catch (err) {
      ErrorResponse(err, toastId);
    }
  };

  // const role = "admin";

  return (
    <div className="flex  items-center justify-center h-[80vh]">
      <div className="w-[800px] text-black">
        <div className="flex items-center gap-x-2 mb-4">
          <h1 className="font-600 text-32 text-primary ">
            Change Your Password
          </h1>
        </div>
        <EForm
          onSubmit={onSubmit}
          resolver={zodResolver(authValidationSchema.changePasswordSchema)}
        >
          <EInput
            label="Current Password"
            type="password"
            size="large"
            name="oldPassword"
            placeholder="Enter your current password"
          />
          <EInput
            label="New Password"
            type="password"
            size="large"
            name="newPassword"
            placeholder="Enter your new  password"
          />
          <EInput
            label="Confirm Password"
            type="password"
            size="large"
            name="confirmPassword"
            placeholder="Enter confirm password"
          />

          <p
            onClick={handleForgotPassword}
            className="text-gray text-end text-18 mb-4 font-600 cursor-pointer hover:text-[#cb4b01]"
          >
            Forgot Password
          </p>

          <Button
            htmlType="submit"
            className="btn-hover-outline"
            icon={<GiConfirmed />}
          >
            Confirm
          </Button>
        </EForm>
      </div>
    </div>
  );
};

export default ChangePasswordFrom;
