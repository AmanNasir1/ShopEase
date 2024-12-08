import { ConfigProvider, Menu } from "antd";
import { MenuInfo } from "rc-menu/lib/interface";
import ShopEaseLogo from "../../../assets/svgs/icons/logo.svg";
import { useCallback, useEffect, useRef, useState } from "react";
import SESider from "../../atoms/se-sider";
import { cn } from "../../../utils/helper/tailwind-helper";
import {
  AppstoreOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  OrderedListOutlined,
  PieChartOutlined,
  ProductOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

interface SideCollapsedProps {
  sideBarCollapsed: (collapsed: boolean) => void;
}

interface IScreenSize {
  width?: number;
  height?: number;
}

function SideBar({ sideBarCollapsed }: SideCollapsedProps) {
  const items = [
    {
      key: "dashboard",
      label: "Dashboard",
      icon: <PieChartOutlined />,
    },
    {
      key: "products-management",
      label: "Product Management",
      icon: <ProductOutlined />,
    },
    {
      key: "order-management",
      label: "Order Management",
      icon: <OrderedListOutlined />,
    },
    {
      key: "customer-management",
      label: "Customer Management",
      icon: <UserOutlined />,
    },
    {
      key: "category-management",
      label: "Category Management",
      icon: <AppstoreOutlined />,
    },
    {
      key: "settings",
      label: "Settings",
      icon: <SettingOutlined />,
    },
  ];

  const [collapse, setCollapse] = useState<boolean>(false);
  const [screenSize, setScreenSize] = useState<IScreenSize>();
  const sideBarRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const getCurrentDimension = useCallback(() => {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }, []);

  const updateDimension = useCallback(() => {
    const newSize = getCurrentDimension();
    setScreenSize(newSize);

    if (newSize.width > 991 && collapse) {
      setCollapse(false);
      sideBarCollapsed(false);
    }
  }, [collapse, getCurrentDimension, sideBarCollapsed]);

  const collapsedFunc = (collapsed: boolean) => {
    if (screenSize?.width && screenSize?.width <= 991) {
      sideBarCollapsed(collapsed);
      setCollapse(collapsed);
    }
  };

  useEffect(() => {
    updateDimension();
    window.addEventListener("resize", updateDimension);

    return () => {
      window.removeEventListener("resize", updateDimension);
    };
  }, [updateDimension]);

  function onSelect(e: MenuInfo) {
    navigate("/" + e.key);
  }

  const getSelectedLocationKey = () => {
    const locationKey = location.pathname.split("/")[1];

    return locationKey;
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            itemSelectedBg: "#000000",
            itemHeight: 46,
            itemActiveBg: "#DBF9F3",
            itemPaddingInline: 100,
            itemBorderRadius: 0,
            itemMarginInline: 0,
            iconSize: 15,
            fontSize: 14,
          },
          Layout: {
            siderBg: "#f5f5f5",
          },
        },
      }}
    >
      <SESider
        ref={sideBarRef}
        breakpoint="lg"
        width={"300"}
        theme="light"
        onCollapse={(collapsed) => {
          collapsedFunc(collapsed);
        }}
        collapsed={collapse}
        zeroWidthTriggerStyle={{
          backgroundColor: "#fff",
          color: "#001529",
          border: 0,
          top: "12px",
          zIndex: "999",
        }}
        trigger={collapse ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        className={cn(
          `z-50 h-screen [&_.ant-menu-item-icon]:flex [&_.ant-menu-item-icon]:!w-5 [&_.ant-menu-item-icon]:justify-center [&_.ant-menu-item-selected]:!text-white [&_.ant-menu-item]:text-black`,
          {
            "!absolute": window.innerWidth <= 991,
          }
        )}
        onSelect={(e) => console.log(e)}
      >
        <div className="flex flex-col items-center justify-center h-16 mt-2 ">
          <img src={ShopEaseLogo} alt="" className="flex w-12" />
          <h1 className="text-xl font-bold  font-serif">ShopEase</h1>
        </div>

        <div
          className={cn(
            "no-scrollbar h-[calc(100vh-120px)] overflow-auto border-0 border-t-2 border-solid border-[#f5f5f5] font-light"
          )}
        >
          <Menu
            selectedKeys={[getSelectedLocationKey()]}
            items={items}
            mode="inline"
            onClick={(info) => {
              collapsedFunc(!!screenSize?.width && screenSize?.width <= 991);
              onSelect(info);
            }}
          />
        </div>
      </SESider>
    </ConfigProvider>
  );
}

export default SideBar;
