import { Layout } from "antd";
import SideBar from "../../organism/sidebar";
import { Content } from "antd/es/layout/layout";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../../organism/header";
import { cn } from "../../../utils/helper/tailwind-helper";
import { useEffect } from "react";

function AdminLayout() {
  const location = useLocation();
  const pathName = location.pathname;
  useEffect(() => {
    const pageTitleFromUrl = pathName.split("/").filter((i) => i !== "")[0];
    console.log(pageTitleFromUrl);

    document.title = `ShopEase | ${pageTitleFromUrl}`;
  }, [pathName]);
  const sideBarCollapsed = (collapsed: boolean) => {
    const layout: HTMLElement = document.getElementById("main-layout-sec")!;

    if (!collapsed) {
      layout?.classList.add(
        "before:content-['']",
        "before:display-block",
        "before:absolute",
        "before:z-40",
        "before:h-full",
        "before:w-full",
        "before:bg-black",
        "before:opacity-50",
        "before:transition-all",
        "before:duration-500",
        "before:ease-in-out"
      );
    } else {
      layout?.classList.remove(
        "before:content-['']",
        "before:display-block",
        "before:absolute",
        "before:z-40",
        "before:h-full",
        "before:w-full",
        "before:bg-black",
        "before:opacity-50",
        "before:transition-all",
        "before:duration-500",
        "before:ease-in-out"
      );
    }
  };

  return (
    <Layout
      id="main-layout-sec"
      className={cn("h-screen w-screen  overflow-hidden")}
      hasSider
    >
      <SideBar sideBarCollapsed={sideBarCollapsed} />
      <Layout>
        <Content className={cn("min-h-[120px] overflow-auto")}>
          <Header />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default AdminLayout;
