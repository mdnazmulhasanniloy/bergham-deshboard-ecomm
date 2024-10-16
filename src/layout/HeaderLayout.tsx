/* eslint-disable @typescript-eslint/no-explicit-any */
import { MenuOutlined } from "@ant-design/icons";
import { Badge, Button } from "antd";
import { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useProfileQuery } from "../redux/features/auth/authApi";
import { TUser, useCurrentUser } from "../redux/features/auth/authSlice";
import { setCollapsed } from "../redux/features/layout/layoutSlice";
// import { useGetMyNotificationQuery } from "../redux/features/notification/notificationApi";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { MdOutlineNotifications } from "react-icons/md";
import { toast } from "sonner";
import { useGetMyNotificationQuery } from "../redux/features/notification/notificationApi";
import showImage from "../utils/showImage";
import config from "../config";

const HeaderLayout = () => {
  const dispatch = useAppDispatch();
  const { data: notificationData } = useGetMyNotificationQuery({ read: false });
  const User: TUser | null = useAppSelector(useCurrentUser);
  const { data: profile } = useProfileQuery(undefined);
  const { role }: any = User || {};
  const notification: any = useAppSelector(
    (state: { notification: { notification: any } }) =>
      state.notification.notification
  );
  useEffect(() => {
    if (notification?.message) {
      toast.info(notification?.message);
    }
  }, [notification]);
  const { pathname } = useLocation();

  const collapsed = useAppSelector(
    (state: { layout: { collapsed: boolean } }) => state.layout.collapsed
  );

  return (
    <div className="flex justify-between">
      <div
        className="flex items-center"
        style={{
          marginLeft: collapsed ? "30px" : "150px",
        }}
      >
        <Button
          type="text"
          icon={<MenuOutlined style={{ color: "black" }} />}
          onClick={() => dispatch(setCollapsed())}
          style={{
            fontSize: "16px",
            width: 45,
            height: 45,
            marginRight: "10px",
          }}
        />
        <h1 className="text-black text-20 font-600">
          {pathname
            .replace(role, "")
            .split(/[/ -]/)
            .filter(Boolean)
            .slice(0, 2)
            .map((part) => part.toUpperCase())
            .join(" ")}

          {/* {role}-Dashboard */}
        </h1>
      </div>
      <div
        className="flex items-center gap-x-4
      "
      >
        <Badge count={notificationData?.data?.length || 0} overflowCount={10}>
          <NavLink to={`/admin/notification`} className="h-32">
            <MdOutlineNotifications
              size={37}
              className="text-orange cursor-pointer p-[7px] rounded-full bg-black"
            />
          </NavLink>
        </Badge>

        <NavLink to={`/${role}/profile`} className="flex items-center gap-x-3">
          {profile?.data?.image ? (
            <img
              src={showImage(profile?.data?.image) || config?.no_image_url}
              width={40}
              height={40}
              className="rounded-full aspect-square"
              alt=""
            />
          ) : (
            <div className="flex items-center justify-center size-10 rounded-full bg-black font-500">
              <p className="text-16">
                {profile?.data?.shop?.shopName[0].toUpperCase()}
              </p>
            </div>
          )}
          <h1 className="text-20 font-500 text-black">
            {profile?.data?.shop?.shopName}
          </h1>
        </NavLink>
      </div>
    </div>
  );
};

export default HeaderLayout;
