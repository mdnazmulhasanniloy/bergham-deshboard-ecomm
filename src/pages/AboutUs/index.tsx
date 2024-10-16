import { useEffect, useRef, useState } from "react";
import JoditEditor from "jodit-react";
import { Button, ConfigProvider } from "antd";
import { MdDoneOutline } from "react-icons/md"; 
import { toast } from "sonner";
import ErrorResponse from "../../component/UI/ErrorResponse";
import { useGetContentsQuery, useUpdateContentMutation } from "../../redux/features/content/contentApi";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
  const editor = useRef(null);
  const { data: data, isSuccess } = useGetContentsQuery({});
  const [updateAboutFn, { isLoading }] = useUpdateContentMutation();
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      setContent(data?.data?.data[0].aboutUs);
    }
  }, [isSuccess, data]);
  if (isLoading) {
    toast.loading("Loading...", { id: "content" });
  }
  const onSubmit = async () => {
    try {
      const res: any = await updateAboutFn({ aboutUs: content }); 
      if (res?.data?.success) {
        toast.success(res?.data?.message, { id: "content" });
        navigate("/admin/setting");
      }
    } catch (error) {
      ErrorResponse(error, "content");
    }
  };
  return (
    <ConfigProvider>
      <div>
        <h1 className="text-primary text-32 font-600  mb-4">About Us</h1>
        <JoditEditor
          ref={editor}
          value={content}
          onChange={(newContent) => {
            setContent(newContent);
          }}
        />
        <div className="flex justify-end mt-4">
          <Button
            onClick={onSubmit}
            className="bg-primary border-2 border-primary text-white hover:bg-white hover:text-primary flex items-center font-600 "
            size="large"
            icon={<MdDoneOutline />}
          >
            Submit
          </Button>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default AboutUs;
