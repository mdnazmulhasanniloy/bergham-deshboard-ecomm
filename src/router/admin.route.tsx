import { MdMoney, MdOutlineDashboard, MdPeopleOutline } from "react-icons/md";

import { EditOutlined, PlusSquareOutlined, ProductOutlined, SettingOutlined, TableOutlined, UserOutlined } from "@ant-design/icons";
import { BiCategory } from "react-icons/bi";
import AboutUs from "../pages/AboutUs";
import Category from "../pages/AdminDashboard/Category";
import AdminEarning from "../pages/AdminDashboard/Earning";
import AdminDashboard from "../pages/AdminDashboard/index";
import Users from "../pages/AdminDashboard/Users"; 
import ChangePasswordFrom from "../pages/ChangePasswordForm";
import Notification from "../pages/Notification";
import Otp from "../pages/Otp";
import PrivacyPolicy from "../pages/PrivaryPolicy";
import Profile from "../pages/Profile";
import Setting from "../pages/Setting";
import TermsAndCondition from "../pages/TermsAndCondition";
import UpdatePassword from "../pages/UpdatePassword";
import Orders from "../pages/AdminDashboard/Orders/Orders";
import OrderDetails from "../pages/AdminDashboard/Orders/OrderDetails";
import Products from "../pages/AdminDashboard/Products";
import AddProducts from "../pages/AdminDashboard/Products/AddProducts";
import EditProducts from "../pages/AdminDashboard/Products/EditProducts";

export const adminRoute = [
  {
    name: "Dashboard",
    path: "dashboard",
    icon: <MdOutlineDashboard size={22} />,
    element: <AdminDashboard />,
  },
  {
    name: "Earning",
    path: "earning",
    icon: <MdMoney size={22} />,
    element: <AdminEarning />,
  },
  {
    name: "Buyers",
    path: "users",
    icon: <UserOutlined style={{ fontSize: "22px" }} />,
    element: <Users />,
  },
  {
    name: "Categories",
    path: "categories",
    icon: <BiCategory size={22} />,
    element: <Category />,
  },
  {
    name: "Product",
    path: "products",
    icon: <ProductOutlined style={{ fontSize: "20px" }} />,
    element: <Products />,
  },
  {
    path: "add-product",
    icon: <PlusSquareOutlined style={{ fontSize: "20px" }} />,
    element: <AddProducts />,
  },
  {
    path: "edit-product/:id",
    icon: <EditOutlined style={{ fontSize: "20px" }} />,
    element: <EditProducts />,
  },

  {
    name: "Order",
    path: "order",
    icon: <TableOutlined style={{ fontSize: "20px" }} />,
    element: <Orders />,
  },
  {
    path: "order/details/:id",
    element: <OrderDetails />,
  }, 
 
  {
    path: "profile",
    element: <Profile />,
  },
  {
    name: "Settings",
    path: "setting",
    icon: <SettingOutlined style={{ fontSize: "20px" }} />,
    element: <Setting />,
  },
  {
    path: "notification",
    element: <Notification />,
  },
  {
    path: "change-password",
    element: <ChangePasswordFrom />,
  },
  {
    path: "otp",
    element: <Otp />,
  },
  {
    path: "update-password",
    element: <UpdatePassword />,
  },
  {
    path: "privacy-policy",
    element: <PrivacyPolicy />,
  },
  {
    path: "terms",
    element: <TermsAndCondition />,
  },
  {
    path: "about",
    element: <AboutUs />,
  },
];
