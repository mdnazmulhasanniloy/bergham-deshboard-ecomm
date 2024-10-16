/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  InfoCircleOutlined,
  PlusSquareFilled,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  ColorPicker,
  Popover,
  Row,
  Spin,
  Tooltip,
  Upload,
} from "antd";
import EForm from "../../../component/Form/FormProvider";
import EInput from "../../../component/Form/ResInput";
import ESelect from "../../../component/Form/ResSelect";
import ETextArea from "../../../component/Form/ResTextarea";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetSingleProductQuery,
  useUpdateProductMutation,
} from "../../../redux/features/products/productApi";
import { useGetCategoriesQuery } from "../../../redux/features/category/category.api";
import ErrorResponse from "../../../component/UI/ErrorResponse";
import { toast } from "sonner";
import JoditEditor, { Jodit } from "jodit-react";
import showImage from "../../../utils/showImage";

const EditProducts = () => {
  const navigate = useNavigate();
  const [updateProduct] = useUpdateProductMutation();
  const editor = useRef(null);
  const [longDescription, setLongDescription] = useState("");
  const [longDescError, setLongDescError] = useState("");
  const productId = useParams()?.id;

  // -------------------- Get product data from redux store -----------------------
  // const { product: singleProduct }: any = useAppSelector(
  //   (state) => state.product
  // );
  const { data: productRes, isLoading: isProductLoading } =
    useGetSingleProductQuery(productId, {
      skip: !productId,
    });
  const singleProduct = useMemo(() => {
    if (productRes?.success) {
      return productRes?.data;
    }

    return {};
  }, [productRes]);

  // -------------------- Get categories --------------------
  const { data: categoryRes } = useGetCategoriesQuery({ limit: 99999 });
  const categories = categoryRes?.data?.data || [];

  // -------------------- Size options --------------------
  const sizeOptions = ["XS", "SM", "M", "L", "XL"].map((size) => {
    return {
      label: size,
      value: size,
    };
  });

  // -------------------- Color Options -------------------- //
  const [colors, setColors] = useState<any[]>(
    singleProduct?.color?.map((clr: any, idx: any) => {
      return { key: idx + 1, hex: clr };
    }) || []
  );

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

  // -------------------- Handle upload image ----------------------

  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (singleProduct?._id) {
      setFileList(
        singleProduct?.images?.map((img: any) => {
          return { url: showImage(img?.url) };
        })
      );
    }
  }, [singleProduct]);

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

  // Define default values
  const defaultValues = {
    name: singleProduct?.name,

    shortDescription: singleProduct?.shortDescription,

    description: singleProduct?.description,

    brand: singleProduct?.brand,

    stock: singleProduct?.stock,

    price: singleProduct?.price,

    discount: singleProduct?.discount,

    size: singleProduct?.size,
  };

  // Set jodit editor default value
  useEffect(() => {
    if (singleProduct) {
      setLongDescription(singleProduct?.description);
    }
  }, [singleProduct]);

  const onSubmit = async (data: any) => {
    if (!longDescription) {
      setLongDescError("Detailed description can't be empty");
    }

    if (!fileList?.length) {
      return ErrorResponse({
        message: "Please upload at least 1 product image",
      });
    }

    const updatedData = {
      ...data,
      description: longDescription,
      shortDescription: data?.shortDescription,
      stock: Number(data?.stock),
      price: Number(data?.price),
      discount: Number(data?.discount),
      color: colors?.length ? colors.map((clr) => clr.hex) : [],
      size: data.size || [],
    };

    // Delete image from data object as image will be appended as formdata
    delete data["images"];

    const toastId = toast.loading("Updating product...");

    const formData = new FormData();

    formData.append("data", JSON.stringify(updatedData));

    // Get image files
    // @ts-ignore
    const images = fileList.map((file) => file.originFileObj);

    // Append multiple images in formdata
    images.forEach((image: any) => {
      formData.append(`images`, image);
    });

    try {
      await updateProduct({ _id: singleProduct?._id, data: formData }).unwrap();

      toast.success("Product updated successfully", {
        id: toastId,
        duration: 1800,
      });

      navigate("/admin/products");
    } catch (error) {
      ErrorResponse(error, toastId);
    }
  };

  if (isProductLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={16}>
          <EForm onSubmit={onSubmit} defaultValues={defaultValues!}>
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
                  height: 900,
                  //@ts-ignore
                  placeholder: "Enter detailed description of your product",
                  // askBeforePasteHTML: false,
                  pasteHTMLActionList: Jodit.atom([
                    {
                      value: Jodit.constants.INSERT_ONLY_TEXT,
                      text: "Insert only Text",
                    },
                  ]),
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
              defaultValue={singleProduct?.category?._id}
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
              label="Enter Price"
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
              defaultValue={singleProduct?.size}
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

            <button className="hidden" type="submit" id="formSubmitBtn" />
          </EForm>
        </Col>
        <Col span={8} className="flex justify-center">
          <Upload
            onChange={handleChange}
            beforeUpload={beforeUpload}
            fileList={fileList}
            listType="picture"
            maxCount={3}
          >
            <div className="border  text-18 font-500 text-primary border-primary rounded flex flex-col items-center  px-[200px] py-[20px] cursor-pointer ">
              <UploadOutlined />
              <button>Upload</button>
            </div>
          </Upload>
        </Col>
      </Row>
      <div className="flex justify-between gap-x-6 mt-10">
        <Button
          htmlType="submit"
          className="w-1/2 bg-primary h-[44px] text-white font-500 text-20"
          onClick={() => document.getElementById("formSubmitBtn")?.click()}
        >
          Update
        </Button>
        <Button
          htmlType="button"
          className="w-1/2 bg-white h-[44px] text-black font-500 text-20"
          onClick={() => navigate("/seller/products")}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default EditProducts;
