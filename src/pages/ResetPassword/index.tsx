import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "antd";
import { GiConfirmed } from "react-icons/gi";
import GuruForm from "../../component/Form/FormProvider";
import EInput from "../../component/Form/ResInput";
import { authValidationSchema } from "../../schema/auth.schema";
const ResetPassword = () => {
  const onSubmit = async () => {};
  return (
    <div className="flex  items-center justify-center h-[80vh]">
      <div className="w-[800px] text-black">
        <div className="flex items-center gap-x-2 mb-4">
          <h1 className="font-600 text-32 text-primary ">
            Reset Your Password
          </h1>
        </div>
        <GuruForm
          onSubmit={onSubmit}
          resolver={zodResolver(authValidationSchema.changePasswordSchema)}
        >
          <EInput
            label="New Password"
            type="password"
            size="large"
            name="newPassword"
            placeholder="enter your current password"
          />
          <EInput
            label="Confirm Password"
            type="password"
            size="large"
            name="confirmPassword"
            placeholder="enter your new  password"
          />

          <Button
            htmlType="submit"
            className="btn-hover-outline"
            icon={<GiConfirmed />}
          >
            Confirm
          </Button>
        </GuruForm>
      </div>
    </div>
  );
};

export default ResetPassword;
