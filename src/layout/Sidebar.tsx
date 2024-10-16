/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Button, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { IoLogInOutline } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { logout, useCurrentUser } from "../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { adminRoute } from "../router/admin.route"; 
import { sidebarItemsGenerator } from "../utils/sidebarItemsGenerator";
import logoWhite from "../assets/logo-white.png";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { pathname } = location;
  const collapsed = useAppSelector((state) => state.layout.collapsed);
  const { role }: any = useAppSelector(useCurrentUser) || {};

  let SidebarItems;
  switch (role) {
    case "admin":
      SidebarItems = sidebarItemsGenerator(adminRoute, role);
      break;
  

    default:
      break;
  }
  const handeLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      breakpoint="lg"
      className="shadow-xl"
      style={{
        height: "100vh",
        zIndex: 154,
        overflow: "auto",
        position: "fixed",
        top: "0",
        left: "0", 
        backgroundColor: "white",
      }}
    >
      <div
        style={{
          color: "#000",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "1rem",
          paddingInline: "16px",
        }}
      >
        <img src={logoWhite} alt="" />
      </div>
      <Menu
        style={{
          backgroundColor: "",
          marginTop: "10px",
        }}
        // theme="dark"
        mode="inline"
        // selectedKeys={[pathname]}
        defaultSelectedKeys={[pathname]}
        // @ts-ignore
        items={SidebarItems}
      />

      {!collapsed ? (
        <div className="absolute w-full bottom-5 flex justify-center items-center px-2">
          <Button
            onClick={handeLogout}
            icon={<IoLogInOutline size={22} />}
            className="w-full bg-black flex items-center justify-center font-600 text-18 h-[40px] border border-white text-white"
          >
            Log Out
          </Button>
        </div>
      ) : null}
    </Sider>
  );
};

export default Sidebar;
