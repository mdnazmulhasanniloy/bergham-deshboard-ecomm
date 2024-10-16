/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "antd";
import EInput from "../Form/ResInput";

import { GiConfirmed } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { TUser, useCurrentUser } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";
import ErrorResponse from "../UI/ErrorResponse";

import { zodResolver } from "@hookform/resolvers/zod";
import { useResetPasswordMutation } from "../../redux/features/auth/authApi";
import { authValidationSchema } from "../../schema/auth.schema";
import EForm from "../Form/FormProvider";

interface SubmitProps {
  newPassword: string;
  confirmPassword: string;
}
const UpdatePasswordForm = () => {
  const navigate = useNavigate();
  const [resetPassword] = useResetPasswordMutation();
  const user: TUser | null = useAppSelector(useCurrentUser);
  const onSubmit = async (data: SubmitProps) => { 
    const toastId = toast.loading("Resetting");
    try {
      const res = await resetPassword(data).unwrap();
      toast.success("Password updated successfully", {
        id: toastId,
        duration: 200,
      });
      navigate(`/${user?.role}/dashboard`);
    } catch (err) {
      ErrorResponse(err, toastId);
    }
  };
  return (
    <div>
      <EForm
        onSubmit={() => onSubmit}
        resolver={zodResolver(authValidationSchema.resetPasswordSchema)}
      >
        <EInput
          label="New Password"
          size="large"
          type="password"
          name="newPassword"
          placeholder="enter your new password"
        />
        <EInput
          label="Confirm Password"
          size="large"
          type="password"
          name="confirmPassword"
          placeholder="enter your confirm password"
        />

        <Button
          htmlType="submit"
          className="bg-primary h-[38px] w-full flex justify-center items-center font-600 text-18 border-0"
          icon={<GiConfirmed />}
        >
          Confirm
        </Button>
      </EForm>
    </div>
  );
};

export default UpdatePasswordForm;
