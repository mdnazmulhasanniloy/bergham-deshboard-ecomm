import { createBrowserRouter } from "react-router-dom";
import ForgotPassword from "../pages/ForgotPassword";
import Login from "../pages/Login";

import App from "../App";
import NotFound from "../NotFound";
import NewPassword from "../pages/NewPassword";
import VerifyOtp from "../pages/VerifyOtp";
import { routeGenerator } from "../utils/routeGenerator";
import { adminRoute } from "./admin.route"; 
import PrivateRoute from "./PrivateRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/admin",
    element: (
      <PrivateRoute role="admin">
        <App />
      </PrivateRoute>
    ),
    children: routeGenerator(adminRoute),
  },
  // {
  //   path: "/seller",
  //   element: (
  //     <PrivateRoute role="seller">
  //       <App />
  //     </PrivateRoute>
  //   ),
  //   children: routeGenerator(vendorRoute),
  // },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/verify-otp",
    element: <VerifyOtp />,
  },
  {
    path: "/new-password",
    element: <NewPassword />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
export default router;
