import { ConfigProvider } from "antd";
import ShopEaseLogo from "../../../assets/svgs/icons/logo.svg";
import { useCallback, useEffect, useRef, useState } from "react";
import SESider from "../../atoms/se-sider";
import { cn } from "../../../utils/helper/tailwind-helper";

interface SideCollapsedProps {
  sideBarCollapsed: (collapsed: boolean) => void;
}

interface IScreenSize {
  width?: number;
  height?: number;
}

function SideBar({ sideBarCollapsed }: SideCollapsedProps) {
  const [collapse, setCollapse] = useState<boolean>(false);
  const [screenSize, setScreenSize] = useState<IScreenSize>();
  const sideBarRef = useRef<HTMLDivElement | null>(null);

  const getCurrentDimension = useCallback(() => {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }, []);

  const updateDimension = useCallback(() => {
    setScreenSize(getCurrentDimension());
  }, [setScreenSize, getCurrentDimension]);

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

  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {},
        },
      }}
    >
      <SESider
        ref={sideBarRef}
        breakpoint="lg"
        onCollapse={(collapsed) => {
          collapsedFunc(collapsed);
        }}
        collapsed={collapse}
        width={`${window.innerWidth <= 991 ? "300" : "340"}`}
        collapsedWidth={0}
        zeroWidthTriggerStyle={{
          backgroundColor: "#fff",
          color: "#001529",
          border: 0,
          top: "12px",
          zIndex: "999",
        }}
        theme="light"
        className={cn(
          `z-50 h-screen [&_.ant-menu-item-icon]:flex [&_.ant-menu-item-icon]:!w-5 [&_.ant-menu-item-icon]:justify-center [&_.ant-menu-item-selected]:!text-teal [&_.ant-menu-item]:text-secondary`,
          {
            "!absolute": window.innerWidth <= 991,
          }
        )}
        onSelect={(e) => console.log(e)}
      >
        <div className="flex flex-col items-center justify-center h-16 mt-8 ">
          <img src={ShopEaseLogo} alt="" className="flex w-20" />
          <h1 className="text-xl font-bold  font-serif">ShopEase</h1>
        </div>
      </SESider>
    </ConfigProvider>
  );
}

export default SideBar;
