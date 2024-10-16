/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  InfoCircleOutlined,
  PlusSquareFilled,
  UploadOutlined,
} from "@ant-design/icons";
import { Button, Col, ColorPicker, Popover, Row, Tooltip, Upload } from "antd";
import EForm from "../../../component/Form/FormProvider";
import EInput from "../../../component/Form/ResInput";
import ESelect from "../../../component/Form/ResSelect";
import ETextArea from "../../../component/Form/ResTextarea";
import { useGetCategoriesQuery } from "../../../redux/features/category/category.api";
import { useRef, useState } from "react";
import ErrorResponse from "../../../component/UI/ErrorResponse";
import { toast } from "sonner";
import { useAddProductMutation } from "../../../redux/features/products/productApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { addProductValidation } from "../../../schema/product.schema";
import JoditEditor, { Jodit } from "jodit-react";
import "./AddProducts.css";
import { Link, useNavigate } from "react-router-dom";

const AddProducts = () => {
  const navigate = useNavigate();
  const [addProduct] = useAddProductMutation();

  // Jodit Editor value
  const [longDescription, setLongDescription] = useState("");
  const [longDescError, setLongDescError] = useState("");
  const editor = useRef(null);

  // Size options
  const sizeOptions = ["XS", "SM", "M", "L", "XL"].map((size) => {
    return {
      label: size,
      value: size,
    };
  });

  // Color Options
  const [colors, setColors] = useState<any[]>([]);
  const handleColor = (colorObj: any) => {
    const { key } = colorObj;

    // Check if existed color changed or
    // new color added
    const exist = colors.find((clr) => clr.key === key);

    if (exist) {
      const rest = colors.filter((clr) => clr.key !== exist.key);

      setColors([...rest, colorObj]);
      return;
    }
  };
  const handleAddNewColor = () => {
    setColors([...colors, { key: colors.length + 1, hex: "#ffffff" }]); // set white as default for new color
  };

  // Get categories
  const { data: categoryRes } = useGetCategoriesQuery({ limit: 99999 });
  const categories = categoryRes?.data?.data || [];

  // Product image filelist
  const [fileList, setFileList] = useState([]);

  const handleChange = ({ fileList: newFileList }: any) => {
    if (newFileList.length <= 3) {
      setFileList(newFileList);
    } else {
      ErrorResponse({ message: "You can only upload up to 3 photos." });
    }
  };

  const beforeUpload = () => {
    if (fileList.length >= 3) {
      ErrorResponse({ message: "You can only upload up to 3 photos." });
      return false;
    }
    return true;
  };

  // Add product
  const onSubmit = async (data: any) => {
    setLongDescError("");

    if (!longDescription) {
      setLongDescError("Detailed description of the product can't be empty!");
    }

    if (!fileList?.length) {
      return ErrorResponse({
        message: "Please upload at least 1 product image",
      });
    }

    const updatedData = {
      ...data,
      stock: Number(data?.stock),
      price: Number(data?.price),
      discount: Number(data?.discount),
      color: colors?.length ? colors.map((clr) => clr.hex) : [],
      size: data.size || [],
      shortDescription: data?.shortDescription,
      description: longDescription,
    };

    const toastId = toast.loading("Adding product...");

    const formData = new FormData();

    formData.append("data", JSON.stringify(updatedData));

    // Get image files
    // @ts-ignore
    const images = fileList.map((file) => file.originFileObj);
    // Append multiple images in formdata
    images.forEach((image) => {
      formData.append(`images`, image);
    });

    try {
      await addProduct(formData).unwrap();

      toast.success("Product added successfully", {
        id: toastId,
        duration: 2000,
      });

      navigate("/admin/products");
    } catch (error) {
      ErrorResponse(error, toastId);
    }
  };

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={16}>
          <EForm
            onSubmit={onSubmit}
            resolver={zodResolver(addProductValidation)}
          >
            <EInput
              label="Enter Product Name"
              placeholder="Enter Product Name"
              name="name"
              size="large"
              type="text"
            />

            <ETextArea
              label="Short description"
              placeholder="Enter short description (max 400 characters)"
              name="shortDescription"
              style={{ height: "70px" }}
              maxLength={400}
            />

            <div className="space-y-2 mb-10" id="add-product-detailed-desc">
              <label>Detailed Description</label>
              <JoditEditor
                ref={editor}
                value={longDescription}
                config={{
                  height: 1000,
                  //@ts-ignore
                  placeholder: "Enter detailed description of your product",
                  // askBeforePasteHTML: false,
                  // pasteHTMLActionList: Jodit.atom([
                  //   {
                  //     value: Jodit.constants.INSERT_ONLY_TEXT,
                  //     text: "Insert only Text",
                  //   },
                  // ]),
                  controls: {
                    font: {
                      list: Jodit.atom({
                        "Poppins,sans-serif": "Poppins",
                      }),
                    },
                  },
                }}
                onBlur={(newContent) => setLongDescription(newContent)}
              />

              {longDescError && <p style={{ color: "red" }}>{longDescError}</p>}
            </div>

            <ESelect
              name="category"
              options={
                categories?.length
                  ? categories.map((category: any) => {
                      return { value: category._id, label: category.name };
                    })
                  : []
              }
              size="large"
              label="Enter Product Category"
              placeholder="Select category"
            />
            <EInput
              label="Enter Brand Name"
              placeholder="Enter Brand Name"
              name="brand"
              size="large"
              type="text"
            />
            <EInput
              label="Stock Quantity"
              placeholder="Enter stock"
              name="stock"
              size="large"
              type="number"
            />
            <EInput
              label="Price"
              placeholder="Enter price"
              name="price"
              size="large"
              type="number"
            />

            <EInput
              label="Enter Discount (%)"
              placeholder="Enter product discount percentage"
              name="discount"
              size="large"
              type="number"
            />

            <ESelect
              label={
                <div>
                  Select Sizes (Optional)
                  <Popover
                    content={
                      <ul>
                        <li>
                          <em>Number:</em> (inch)
                        </li>
                        <li>
                          <em>Text:</em> (standard)
                        </li>
                      </ul>
                    }
                    title="Size Unit(s)"
                  >
                    <InfoCircleOutlined
                      style={{ color: "#4169e1", marginLeft: "4px" }}
                    />
                  </Popover>
                </div>
              }
              name="size"
              mode="tags"
              options={sizeOptions}
              placeholder="Enter size (press enter to add more)"
              size="large"
            />

            {/* Select colors */}
            <div>
              <label htmlFor="colors">Select Colors (Optional)</label>

              <div className="flex items-center gap-x-4 mt-2">
                {colors.map((color) => (
                  <button type="button" key={color?.key}>
                    <ColorPicker
                      defaultValue={color?.hex}
                      showText
                      allowClear
                      onChange={(value) =>
                        handleColor({
                          key: color?.key,
                          hex: `#${value.toHex()}`,
                        })
                      }
                    />
                  </button>
                ))}

                {/* add color button */}
                <Tooltip title="Add Color">
                  <button type="button" onClick={handleAddNewColor}>
                    <PlusSquareFilled
                      style={{
                        color: "gray",
                        fontSize: "22px",
                      }}
                    />
                  </button>
                </Tooltip>
              </div>
            </div>

            <button
              className="hidden"
              type="submit"
              id="formSubmitBtn"
            ></button>
          </EForm>
        </Col>
        <Col span={8} className="flex justify-center">
          <div>
            <p className="mb-2 required-indicator">Upload Product Image</p>
            <Upload
              onChange={handleChange}
              beforeUpload={beforeUpload}
              fileList={fileList}
              listType="picture"
              maxCount={3}
            >
              <div className="border text-18 font-500 text-primary border-primary rounded flex flex-col items-center px-[200px] py-[20px] cursor-pointer">
                <UploadOutlined />
                <button>Upload</button>
              </div>
            </Upload>
          </div>
        </Col>
      </Row>
      <div className="flex justify-between gap-x-6 mt-10">
        <Button
          htmlType="submit"
          className="w-1/2 bg-primary h-[44px] text-white font-500 text-20"
          onClick={() => document.getElementById("formSubmitBtn")?.click()}
        >
          Upload
        </Button> 
      <Button onClick={()=>navigate("/admin/products")} className="w-1/2 bg-white h-[44px] text-black font-500 text-20">
          Cancel
        </Button>
    
      </div>
    </div>
  );
};

export default AddProducts;
