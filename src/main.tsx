import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router/routes";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "sonner";
import { ConfigProvider } from "antd";
import { mainTheme } from "./themes/mainTheme";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConfigProvider theme={mainTheme}>
          <RouterProvider router={router} />
        </ConfigProvider>
        <Toaster position="top-right" richColors />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
