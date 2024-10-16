/* eslint-disable @typescript-eslint/no-explicit-any */
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useState } from "react";
import { toast } from "sonner";
import EModal from "../../../component/Modal/Modal";
import ErrorResponse from "../../../component/UI/ErrorResponse";
import Loading from "../../../component/UI/Loading";
import EPagination from "../../../component/UI/Pagination";
import ResConfirm from "../../../component/UI/PopConfirm";
import {
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from "../../../redux/features/category/category.api";
import AddCategory from "./AddCategory";
import EditCategory from "./EditCategory";
import showImage from "../../../utils/showImage";

const Category = () => {
  const [page, setPage] = useState(1);
  const query: Record<string, any> = {};
  query["page"] = page;
  const { data: categoryRes, isLoading } = useGetCategoriesQuery(query);
  const [DeleteFn] = useDeleteCategoryMutation();
  const [showAddCateogry, setShowAddCateogry] = useState(false);
  const [showEditCategory, setShowEditCategory] = useState(false);
  const [showEditCategoryData, setShowEditCategoryData] = useState({});
  const catagoriesData = categoryRes?.data?.data || [];
  const handelToDeleteCategory = async (id: string) => {
    toast.loading("deleting category...", {
      id: "delete_category",
      duration: 200,
    });

    try {
      const res = await DeleteFn(id).unwrap();
      toast.success(res.message, { id: "delete_category", duration: 2000 });
    } catch (error: any) {
      ErrorResponse(error, "delete_category");
    }
  };

  if (isLoading && catagoriesData?.length === 0) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <Loading />
      </div>
    );
  }
  return (
    <div>
      <EModal
        showModal={showAddCateogry}
        setShowModal={setShowAddCateogry}
        title="Add Category"
      >
        <AddCategory setshow={setShowAddCateogry} />
      </EModal>
      <EModal
        showModal={showEditCategory}
        setShowModal={setShowEditCategory}
        title="Edit Category"
      >
        <EditCategory
          setshow={setShowEditCategory}
          categoryData={showEditCategoryData}
        />
      </EModal>
      <div className="flex justify-end ">
        <Button
          onClick={() => setShowAddCateogry((prev) => !prev)}
          icon={<PlusOutlined />}
          className="flex items-center bg-orange text-white !border-orange hover:!text-orange font-500 text-18 h-[40px]"
        >
          Add Category
        </Button>
      </div>
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {catagoriesData?.length > 0 &&
          catagoriesData?.map((item: any, id: number) => (
            <div
              key={id}
              className="w-[300px] bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <img
                alt="example"
                src={showImage(item?.banner)}
                className="w-full h-[200px] p-2 object-fill"
              />
              <div className="p-4">
                <h1 className="text-black text-20  font-700 text-center">
                  {item?.name}
                </h1>
                <div className="flex justify-center gap-x-4 mt-4">
                  <ResConfirm
                    handleOk={() => handelToDeleteCategory(item?._id)}
                  >
                    <button className="h-[40px] w-[100px] font-medium border border-orange text-orange rounded">
                      Delete
                    </button>
                  </ResConfirm>
                  <button
                    onClick={() => {
                      setShowEditCategory((prev) => !prev);
                      setShowEditCategoryData(item);
                    }}
                    className="h-[40px] w-[100px] bg-orange text-white font-medium rounded"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="flex justify-end mt-4">
        <EPagination
          pageSize={10}
          onChange={(page) => setPage(page)}
          total={categoryRes?.meta?.total}
        />
      </div>
    </div>
  );
};

export default Category;
