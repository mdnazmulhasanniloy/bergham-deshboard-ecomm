import { ConfigProvider, Layout } from "antd";

import { Content, Header } from "antd/es/layout/layout";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { paginationTheme } from "../themes/paginationThemes";
import { sidebardThemes } from "../themes/sidebarThemes";
import HeaderLayout from "./HeaderLayout";
import Sidebar from "./Sidebar";

const MainLayout = () => {
  const collapsed = useAppSelector((state) => state.layout.collapsed);

  return (
    <div>
      <ConfigProvider theme={sidebardThemes}>
        <Layout style={{ minHeight: "100vh", backgroundColor: "#f5ded0" }}>
          <Sidebar />
          <Layout>
            <Header className="sticky top-0 z-10 w-full bg-white shadow-xl">
              <HeaderLayout />
            </Header>
            <ConfigProvider theme={paginationTheme}>
              <Content
                style={{
                  padding: "24px 16px 0",
                  backgroundColor: "#f1f1f1",
                  paddingLeft: collapsed ? "110px" : "215px",
                }}
                className={`responsive-content ${
                  !collapsed ? "collapsed" : ""
                }`}
              >
                <div
                  style={{
                    padding: 24,
                    height: "100%",
                    backgroundColor: "#f1f1f1",
                    borderRadius: "10px",
                  }}
                >
                  <Outlet />
                </div>
              </Content>
            </ConfigProvider>
          </Layout>
        </Layout>
      </ConfigProvider>
    </div>
  );
};

export default MainLayout;
