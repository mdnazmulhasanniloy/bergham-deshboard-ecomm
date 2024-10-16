/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Button } from "antd";

import { FieldValues, SubmitHandler } from "react-hook-form";

import { MdEditSquare } from "react-icons/md";
import { toast } from "sonner";
import { useUpdateProfileMutation } from "../../redux/features/auth/authApi";
import EForm from "../Form/FormProvider";
import ResInput from "../Form/ResInput";
import ErrorResponse from "../UI/ErrorResponse";

const ProfileForm = ({ ProfileData, imageFile, refetch }: any) => {
  const [updateProfile] = useUpdateProfileMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Updating profile...");

    try {
      const formData = new FormData();
      if (imageFile) {
        formData.append("image", imageFile);
      }
      formData.append("data", JSON.stringify(data));
      const res = await updateProfile(formData).unwrap();
      toast.success("Profile updated successfully", {
        id: toastId,
        duration: 2000,
      });

      if (res.success) {
        refetch();
      }
    } catch (err) {
      ErrorResponse(err, toastId);
    }
  };

  return (
    // @ts-ignore

    <EForm
      onSubmit={onSubmit}
      defaultValues={ProfileData?.data}
      // disabled={toggleEdit}
    >
      <ResInput
        labelColor="#FD8533"
        label="First Name"
        type="text"
        name="name"
        placeholder="Enter your first name"
        size="large"
      />
     
      <ResInput
        labelColor="#FD8533"
        label="Email"
        type="email"
        name="email"
        placeholder="Enter your email"
        size="large"
      />
      <ResInput
        labelColor="#FD8533"
        label="Phone Number"
        type="tel"
        name="phoneNumber"
        placeholder="Enter your phone number"
        size="large"
      />

      <div className="flex  justify-end gap-x-2">
        <Button
          htmlType="submit"
          className="bg-primary text-white h-[40px] flex justify-center items-center font-600 text-18  "
          icon={<MdEditSquare />}
        >
          Update
        </Button>
      </div>
    </EForm>
  );
};

export default ProfileForm;
