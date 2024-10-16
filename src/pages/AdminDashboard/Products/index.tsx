import {
  DeleteOutlined,
  EditOutlined,
  LeftOutlined,
  PlusOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { Button, Col, ConfigProvider, Empty, Row, Segmented } from "antd";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../../../component/ProductCard/ProductCard";
import EPagination from "../../../component/UI/Pagination";
import { useSelector } from "react-redux";
import { useCurrentUser } from "../../../redux/features/auth/authSlice";
import {
  useDeleteProductMutation,
  useGetallProductQuery, 
} from "../../../redux/features/products/productApi";
import ResConfirm from "../../../component/UI/PopConfirm";
import { toast } from "sonner";
import ErrorResponse from "../../../component/UI/ErrorResponse";
import { useAppDispatch } from "../../../redux/hooks";
import { setProduct } from "../../../redux/features/products/productSlice";
import { useGetCategoriesQuery } from "../../../redux/features/category/category.api";

interface ICategory {
  name: string;
  _id: string;
}
const Products = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const query: Record<string, any> = {};
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1); 

    // --------------------- Get categories ------------------------ //
    const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(null);
    const categoryQuery:Record<string, any> ={}
    categoryQuery["limit"]=999999999999999
    categoryQuery["sort"]="createdAt"
  
    const {data: categoriesRes} = useGetCategoriesQuery(categoryQuery)
    const categories = categoriesRes?.data?.data || [] 
  
   
    query["category"] = selectedCategory?._id;


  // -------------------- Get products --------------------------- //
  query["limit"] = limit;
  query["page"] = currentPage;
  query["category"]=selectedCategory?._id
  const { data: productsRes } = useGetallProductQuery(query); 
  const products = useMemo(
    () => productsRes?.data?.allProducts || [],
    [productsRes]
  ); 

  const paginationData = productsRes?.data?.meta || {};



  // ---------------------- Delete product --------------------- //
  const [deleteProduct] = useDeleteProductMutation();

  const handleDeleteProduct = async (productId: any) => {
    const toastId = toast.loading("Deleting product...");

    try {
      await deleteProduct(productId).unwrap();

      toast.success("Product deleted successfully", {
        id: toastId,
        duration: 2000,
      });
    } catch (error) {
      ErrorResponse(error, toastId);
    }
  };

  // ------------------- Slider navigation buttons --------------------- //
  const scrollContainerRef: any = useRef(null);
  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -100, behavior: "smooth" });
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 100, behavior: "smooth" });
    }
  };

  // --------------------- Change pagination -------------------------- //
  const onPaginationChange = (page: any, pageSize: any) => {
    setCurrentPage(page);
    setLimit(pageSize);
  }; 
  return (
    <div>
      <div className="flex justify-between items-center  ">
        <h1 className="text-20 font-600 text-black">All Products</h1>
        <Button
          onClick={() => navigate("/admin/add-product")}
          className="bg-orange text-white h-[50px] font-500"
          icon={<PlusOutlined />}
        >
          ADD NEW PRODUCT
        </Button>
      </div>

      {/* categories segment */}
      {categories?.length > 0 && (
        <div style={{ padding: "20px", display: "flex", alignItems: "center", gap:"2px" }}>
          <Button
            className="bg-orange text-white"
            icon={<LeftOutlined />}
            onClick={handleScrollLeft}
          />
          <div
            ref={scrollContainerRef}
            style={{
              overflowX: "auto",
              whiteSpace: "nowrap",
              flex: 1,
              margin: "0 10px 0  10px",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <ConfigProvider
              theme={{
                components: {
                  Segmented: {
                    itemSelectedBg: "#FE6201",
                    itemSelectedColor: "white",
                  },
                },
              }}
            >
              <Segmented
                options={categories?.map(
                  (category: any) => category.name
                )}
                size="large"
                onChange={(value) => {
                 
                  setSelectedCategory(
                    categories?.find(
                      (category: any) =>
                        category?.name?.toLowerCase() === value.toLowerCase()
                    )
                  );
                }}
                defaultValue={
                  categories?.length ? categories[0]?.name : ""
                }
              />
            </ConfigProvider>
          </div>
          <Button
            className="bg-orange text-white"
            icon={<RightOutlined />}
            onClick={handleScrollRight}
          />
        </div>
      )}

      {products?.length > 0 ? (
        <Row gutter={[16, 16]}>
          {products?.map((product: any) => (
            <Col key={product?._id} span={8} className="relative">
              <ProductCard product={product} />
              <div className="flex items-center gap-x-4 absolute top-5 right-5">
                <button
                  className="bg-white text-black p-2 rounded"
                  onClick={() =>
                    navigate(`/admin/edit-product/${product?._id}`)
                  }
                >
                  <EditOutlined
                    onClick={() => dispatch(setProduct(product))}
                    style={{ fontSize: "20px" }}
                  />
                </button>

                <ResConfirm
                  handleOk={() => handleDeleteProduct(product?._id)}
                  description="This product will be permanently deleted"
                >
                  <button className="bg-primary text-white p-2 rounded">
                    <DeleteOutlined style={{ fontSize: "20px" }} />
                  </button>
                </ResConfirm>
              </div>
            </Col>
          ))}
        </Row>
      ) : (
        <Empty />
      )}

      <div className="flex justify-end mt-4">
        <EPagination
          total={paginationData?.total}
          onChange={onPaginationChange}
          pageSize={limit}
        />
      </div>
    </div>
  );
};

export default Products;
