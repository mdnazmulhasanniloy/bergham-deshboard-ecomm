/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "antd";
import { toast } from "sonner";
import FileUpload from "../../../component/FileUpload";
import EForm from "../../../component/Form/FormProvider";
import EInput from "../../../component/Form/ResInput";
import ErrorResponse from "../../../component/UI/ErrorResponse";
import UseImageUpload from "../../../hooks/useImageUpload";
import { useCreateCategoryMutation } from "../../../redux/features/category/category.api";

const AddCategory = ({ setshow }: any) => {
  const { setFile, imageFile, imageUrl } = UseImageUpload();
  const [AddCategory] = useCreateCategoryMutation();
  const onSubmit = async (data: any) => {
    toast.loading("category creating...", { id: "category", duration: 300 });

    try {
      const formData = new FormData();

      if (!imageFile) {
        alert("banner is required");
        return;
      }

      formData.append("data", JSON.stringify({ name: data?.category }));
      formData.append("banner", imageFile);
      const res = await AddCategory(formData).unwrap();
      if (res?.success) {
        toast.success(res.message, { id: "category", duration: 300 });
      } else {
        toast.success(res?.message, { id: "category", duration: 300 });
      }
      setshow(false);
    } catch (error) {
      ErrorResponse(error, "category");
    }
  };
  return (
    <div className="text-center">
      <FileUpload setSelectedFile={setFile} imageUrl={imageUrl as string} />
      <EForm onSubmit={onSubmit}>
        <EInput
          label="Enter category name"
          placeholder="please enter category name"
          name="category"
          type="text"
          size="large"
        />
        <Button
          htmlType="submit"
          className="bg-orange text-white w-full h-[40px] text-18 font-500"
        >
          Submit
        </Button>
      </EForm>
    </div>
  );
};

export default AddCategory;
