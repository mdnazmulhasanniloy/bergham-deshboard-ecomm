/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Row } from "antd";
import NotificationCard from "../../component/NotificationCom/NotificationCard";

import {
  useDeleteNotificationMutation,
  useGetMyNotificationQuery,
  useMarkAsReadMutation,
} from "../../redux/features/notification/notificationApi";
import { toast } from "sonner";
import ErrorResponse from "../../component/UI/ErrorResponse";
import ResPagination from "../../component/UI/Pagination";
import { useEffect, useState } from "react";
import NoData from "../../component/NoData/NoData";
import { useAppSelector } from "../../redux/hooks";
import {
  TUser,
  useCurrentToken,
  useCurrentUser,
} from "../../redux/features/auth/authSlice";
import { socket } from "../../socket";

const Notification = () => {
  const [deleteFn] = useDeleteNotificationMutation();
  const [updateNotification] = useMarkAsReadMutation();
  const [page, setPage] = useState<number>(1);
  const query: Record<string, any> = {};
  if (page) query["page"] = page;
  query["limit"] = 10;

  const token = useAppSelector(useCurrentToken);
  const User: TUser | null = useAppSelector(useCurrentUser);
  const {
    data: notificationData,
    isFetching: isNotificationLoading,
    refetch,
  } = useGetMyNotificationQuery(query);

  useEffect(() => {
    socket.auth = { token };
    socket.connect();
    const handleNotificationEvent = (data: any) => {
      if (data) {
        refetch();
        data = null;
      }
    };

    socket.on(
      ("notification::" + User?.userId) as string,
      handleNotificationEvent
    );

    return () => {
      // Clean up the event listener when the component is unmounted
      socket.off(User?.userId as string, handleNotificationEvent);
      socket.disconnect();
    };
  }, [User]);

  const onChange = (page: number, pageSize: number) => {
    setPage(page);
  };

  const submit = async () => {
    const toastId = toast.loading("Updating...");
    try {
      await updateNotification({}).unwrap();
      toast.success("Mark as read successfully", {
        id: toastId,
        duration: 2000,
      });
      window.location.reload();
    } catch (error) {
      ErrorResponse(error, toastId);
    }
  };

  const handelToDelete = async () => {
    const toastId = toast.loading("Deleting...");
    try {
      await deleteFn({}).unwrap();
      toast.success("Notification Deleting successfully", {
        id: toastId,
        duration: 2000,
      });
      window.location.reload();
    } catch (error) {
      ErrorResponse(error, toastId);
    }
  };

  return (
    <div>
      <div className="flex justify-end gap-3">
        <Button
          onClick={submit}
          className="border border-primary text-primary "
        >
          Mark As Read
        </Button>

        <Button onClick={handelToDelete} className="bg-primary text-white ">
          Delete All
        </Button>
      </div>
      <div className="container mx-auto mt-4">
        {isNotificationLoading ? (
          <div className="space-y-5">
            <div className="h-[100px] rounded-lg bg-gray/25 animate-pulse"></div>
            <div className="h-[100px] rounded-lg bg-gray/25 animate-pulse"></div>
            <div className="h-[100px] rounded-lg bg-gray/25 animate-pulse"></div>
            <div className="h-[100px] rounded-lg bg-gray/25 animate-pulse"></div>
            <div className="h-[100px] rounded-lg bg-gray/25 animate-pulse"></div>
            <div className="h-[100px] rounded-lg bg-gray/25 animate-pulse"></div>
            <div className="h-[100px] rounded-lg bg-gray/25 animate-pulse"></div>
            <div className="h-[100px] rounded-lg bg-gray/25 animate-pulse"></div>
          </div>
        ) : (
          <>
            {notificationData?.data?.length ? (
              <>
                <Row gutter={[16, 16]}>
                  {notificationData.data.map((data: any, index: number) => (
                    <NotificationCard key={index} data={data} />
                  ))}
                </Row>
                <div className="text-end mt-4">
                  <ResPagination
                    pageSize={10}
                    total={notificationData?.meta?.total as number}
                    onChange={onChange}
                  />
                </div>
              </>
            ) : (
              <NoData />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Notification;
