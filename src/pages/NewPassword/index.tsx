import { LeftOutlined } from "@ant-design/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { GiConfirmed } from "react-icons/gi";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import GuruForm from "../../component/Form/FormProvider";
import EInput from "../../component/Form/ResInput";
import ErrorResponse from "../../component/UI/ErrorResponse";
import { useResetPasswordMutation } from "../../redux/features/auth/authApi";
import { authValidationSchema } from "../../schema/auth.schema";
import bgImage from "./../../assets/bg_2.jpg";
const NewPassword = () => {
  const [resetPassword] = useResetPasswordMutation();
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Password resetting....");
    try {
      await resetPassword(data).unwrap();
      toast.success("Password reseted successfully", {
        id: toastId,
        duration: 200,
      });
      sessionStorage.clear();
      navigate("/login");
    } catch (err) {
      ErrorResponse(err, toastId);
    }
  };
  return (
    <div
      className="bg-cover bg-center "
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="flex justify-center items-center h-screen ">
        <div className="w-[490px] h-[440px]  bg-white px-4 rounded">
          <div className=" mt-8 ">
            <NavLink to="/verify-otp">
              <LeftOutlined
                style={{
                  backgroundColor: "#CCCCCC",
                  padding: "12px",
                  borderRadius: "50%",
                }}
              />
            </NavLink>
            <h1 className="text-primary text-32 font-600 mt-2">
              Set New Password
            </h1>
            <p className="text-20">
              A password should be more than 8 characters, including digits,
              letters, and symbols
            </p>
          </div>

          <div>
            <GuruForm
              onSubmit={onSubmit}
              resolver={zodResolver(authValidationSchema.resetPasswordSchema)}
            >
              <EInput
                size="large"
                label="New Password"
                type="password"
                name="newPassword"
                placeholder="enter your current password"
              />
              <EInput
                size="large"
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                placeholder="enter your confirm password"
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
      </div>
    </div>
  );
};

export default NewPassword;
