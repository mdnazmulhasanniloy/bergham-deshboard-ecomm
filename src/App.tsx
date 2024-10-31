/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import "./App.css";
import MainLayout from "./layout/MainLayout";
import {
  TUser,
  useCurrentToken,
  useCurrentUser,
} from "./redux/features/auth/authSlice";
import { setNotification } from "./redux/features/notification/notificationSlice";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { socket } from "./socket";
import PrivateRoute from "./router/PrivateRoutes";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const dispatch = useAppDispatch();
  const user: TUser | null = useAppSelector(useCurrentUser);
  const token = useAppSelector(useCurrentToken);
  const navigate = useNavigate();
  const pathname: string = useLocation()?.pathname;

  useEffect(() => {
    if (user?.role && pathname === "/") {
      navigate(`/${user?.role}/dashboard`);
    }
  }, [user?.role, pathname]);

  useEffect(() => {
    socket.auth = { token };
    socket.connect();
    const handleNotificationEvent = (data: any) => { 
      dispatch(setNotification(data));
    };

    socket.on(
      ("notification::" + user?.userId) as string,
      handleNotificationEvent
    );

    return () => {
      // Clean up the event listener when the component is unmounted
      socket.off(user?.userId as string, handleNotificationEvent);
      socket.disconnect();
    };
  }, [user]);

  return (
    <PrivateRoute role={user?.role}>
      <MainLayout />
    </PrivateRoute>
  );
}

export default App;
