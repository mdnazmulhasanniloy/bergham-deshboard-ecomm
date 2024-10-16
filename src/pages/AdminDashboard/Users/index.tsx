import { EyeOutlined } from "@ant-design/icons";
import { Input } from "antd";
import moment from "moment";
import { useState } from "react";
import EModal from "../../../component/Modal/Modal";
import ETable from "../../../component/Table";
import { useDeleteUserMutation, useGetAllUserQuery, useUpdateUserMutation } from "../../../redux/features/auth/authApi";
import UsersDetails from "./UsersDetails";
import { FaRegTrashAlt } from "react-icons/fa";
import ResConfirm from "../../../component/UI/PopConfirm";
import { MdBlock } from "react-icons/md";
import { CgUnblock } from "react-icons/cg";
import ErrorResponse from "../../../component/UI/ErrorResponse";
import { toast } from "sonner";

const Users = () => {
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const [id, setid] = useState("");
  const query: Record<string, any> = {};
  query["searchTerm"] = search;
  query["role"] = "buyer";
  query["sort"] = "-createdAt";
  query["verification.status"] = true;
  const { data: users, isLoading, isFetching } = useGetAllUserQuery(query);
  const allUsers = users?.data?.data|| []; 
  
  
  const [BlockUnBlockedFn, { isSuccess }] = useUpdateUserMutation();
  const [deleteFn] = useDeleteUserMutation();

  const BlockUser = async (id: string) => {
    toast.loading("blocking...", { id: "Block", duration: 3000 });
    try {
      const res = await BlockUnBlockedFn({
        id,
        data: { status: "blocked" },
      }).unwrap();

      if (res?.success) {
        toast.success("this user block success", {
          id: "Block",
          duration: 3000,
        });
      } else {
        toast.success(res?.message, { id: "Block", duration: 3000 });
      }
    } catch (error) {
      ErrorResponse(error, "Block");
    }
  };

  const UnBlockUser = async (id: string) => {
    toast.loading("Unblocking...", { id: "Block", duration: 3000 });
    try {
      const res = await BlockUnBlockedFn({
        id,
        data: { status: "active" },
      }).unwrap();

      if ( res?.success) {
        toast.success("this user unblock success", {
          id: "Block",
          duration: 3000,
        });

      } else {
        toast.success(res?.message, { id: "Block", duration: 3000 });
      }
    } catch (error) {
      ErrorResponse(error, "Block");
    }
  };

  const handelToDeleteUser = async (id: string) => {
    toast.loading("Deleting...", { id: "delete", duration: 3000 });
    try {
      const res = await deleteFn(id).unwrap();
      toast.success(res?.message, { id: "delete", duration: 3000 });
    } catch (error) {
      ErrorResponse(error, "delete");
    }
  };

  const columns = [
    {
      title: "#SI",
      dataIndex: "key",
      key: "id",
      render: (data: any, record: any, index: any) => {
        return index + 1;
      },
    },
    {
      title: "Customer Name",
      dataIndex: "name",
      key: "name", 
    },
    {
      title: "E-mail",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status", 
    },
    {
      title: "Join Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (data: any) => {
        return moment(data).format("LL");
      },
    },
    {
      title: "Action",

      key: "action",
      render: (data: any) => (
        <div className="flex items-center justify-center gap-5">
        <EyeOutlined
        
          className="text-[#95de64] cursor-pointer text-20"
          onClick={() => {
            setid(data?._id);
            setShow((prev: boolean) => !prev);
          }}
        />
        <button>
        <ResConfirm description="Are you sure to Delete this user?" handleOk={() => handelToDeleteUser(data?._id)}>

        <FaRegTrashAlt   className="text-primary text-5xl text-20" />
        </ResConfirm>
        </button>
        {data?.status === "blocked" ? (
            <ResConfirm description="Are you sure to unblock this user." handleOk={() => UnBlockUser(data?._id)}>
              <MdBlock className="text-18 cursor-pointer " color="red" />
            </ResConfirm>
          ) : (
            <ResConfirm description="Are you sure to block this user." handleOk={() => BlockUser(data?._id)}>
              <CgUnblock className="text-18 cursor-pointer" color="green" />
            </ResConfirm>
          )}
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-20 font-500 ">Buyers List</h1>
        <div>
          <Input.Search
            placeholder="Search by email"
            onChange={(e: any) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <EModal showModal={show} setShowModal={setShow} title="Customer Details">
        <UsersDetails id={id} />
      </EModal>
      <ETable
        loading={isLoading ?? isFetching}
        column={columns}
        data={allUsers}
        pagination={{ total: allUsers.length, pageSize: 10 }}
      />
    </div>
  );
};

export default Users;
