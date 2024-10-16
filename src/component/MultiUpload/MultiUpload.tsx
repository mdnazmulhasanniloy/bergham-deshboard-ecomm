/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { GetProp, Image, Upload, UploadFile, UploadProps } from "antd";
import { ReactNode, useState } from "react";

//@ts-ignore
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

interface MultiUploadProps {
  fileList: UploadFile[];
  setFileList: (files: UploadFile[]) => void;
  removeFile?: (file: UploadFile) => Promise<boolean>;
  children: ReactNode;
}

const MultiUpload: React.FC<MultiUploadProps> = ({
  fileList,
  setFileList,
  removeFile,
  children,
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange = (info: any) => {
    // Manually add file to list
    setFileList(info.fileList);
  };

  const handleRemove = async (file: UploadFile) => {
    if (removeFile) {
      const result = await removeFile(file);
      return result;
    }
    return true;
  };

  return (
    <>
      <Upload
        listType="picture-card"
        fileList={fileList}
        beforeUpload={() => false} // Prevent automatic upload
        onPreview={handlePreview}
        onChange={handleChange}
        onRemove={handleRemove}
      >
        {fileList.length >= 5 ? null : children}
      </Upload>
      {previewImage && (
        <Image
          src={previewImage}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible: boolean) => setPreviewOpen(visible),
          }}
        />
      )}
    </>
  );
};

export default MultiUpload;
