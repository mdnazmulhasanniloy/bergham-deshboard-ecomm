/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "antd";
import { toast } from "sonner";
import FileUpload from "../../../component/FileUpload";
import EForm from "../../../component/Form/FormProvider";
import EInput from "../../../component/Form/ResInput";
import ErrorResponse from "../../../component/UI/ErrorResponse";
import UseImageUpload from "../../../hooks/useImageUpload";
import { useUpdateCategoryMutation } from "../../../redux/features/category/category.api";
import showImage from "../../../utils/showImage";

const EditCategory = ({
  categoryData,
  setshow,
}: {
  categoryData: any;
  setshow: any;
}) => {
  const [updateFn] = useUpdateCategoryMutation();
  const { setFile, imageFile, imageUrl } = UseImageUpload();

  const onSubmit = async (data: any) => {
    toast.loading("category updating...", { id: "category", duration: 3000 });

    try {
      const formData = new FormData();

      // if(!imageFile){
      //   alert("banner is required")
      // return
      // }

      if (data) {
        formData.append("data", JSON.stringify({ name: data?.category }));
      }
      if (imageFile) {
        formData.append("banner", imageFile);
      }

      const res = await updateFn({
        data: formData,
        id: categoryData?._id,
      }).unwrap();
      if (res?.success) {
        toast.success(res.message, { id: "category", duration: 300 });
      } else {
        toast.success(res?.message, { id: "category", duration: 300 });
      }
      setshow(false);
    } catch (error) {
      ErrorResponse(error, "category");
    } finally {
      toast.dismiss("category");
    }
  };

  const defaultValue = {
    category: categoryData?.name,
  };

  return (
    <div className="text-center">
      <FileUpload
        setSelectedFile={setFile}
        imageUrl={(imageUrl as string) ?? showImage(categoryData?.banner)}
      />
      <EForm onSubmit={onSubmit} defaultValues={defaultValue}>
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
          Edit
        </Button>
      </EForm>
    </div>
  );
};

export default EditCategory;
