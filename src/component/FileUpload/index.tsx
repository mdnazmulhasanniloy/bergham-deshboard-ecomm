/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { PlusOutlined } from "@ant-design/icons";
import { ConfigProvider, Upload } from "antd";
import { MouseEvent } from "react";
import { multiUpload } from "../../themes/uploadTheme";
import { CiCamera } from "react-icons/ci";

const FileUpload = ({
  setSelectedFile,
  disabled,
  listType = "picture-card",
  imageUrl,
  theme,
}: any) => {
  const customRequest = ({ file }: { file: File | null }) => {
    setSelectedFile(file);
  };
  const props: any = {
    name: "file",
    disabled: disabled,
    listType: listType,
    imageUrl: imageUrl,
    multiple: false,
    showUploadList: false,
    customRequest: customRequest,
  };
  const handleButton = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };
  const uploadButton = (
    <button
      style={{ border: 0, background: "none" }}
      type="button"
      onClick={(e) => handleButton(e)}
    >
      <PlusOutlined className="text-primary" />
      <div style={{ marginTop: 8 }} className="text-primary">
        Upload
      </div>
    </button>
  );

  return (
    <ConfigProvider theme={theme ?? multiUpload}>
      <Upload {...props}>
        {imageUrl ? (
          <div className="relative overflow-hidden group  border]">
            <img
              className="rounded-md"
              src={imageUrl}
              alt="avatar"
              style={{
                width: "100%",
                height: "100%",
                // objectFit: "cover",
                border: "none",
                display: "block",
              }}
            />
            <div
              className="absolute right-0 bottom-0 h-0 w-0 bg-[#000] rounded-tl-full text-white flex items-center justify-center  group-hover:h-10 group-hover:w-10 transition-all duration-500 ease-in-out"
              style={{ borderRadius: "50px 0 8px 0" }}
            >
              <CiCamera className="text-white mt-2" size={18} />
            </div>
          </div>
        ) : (
          uploadButton
        )}
      </Upload>
    </ConfigProvider>
  );
};

export default FileUpload;
