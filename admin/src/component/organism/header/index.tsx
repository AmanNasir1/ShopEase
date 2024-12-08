import { Avatar, Dropdown, Layout } from "antd";
import { Link } from "react-router-dom";

function Header() {
  const { Header } = Layout;
  return (
    <Header
      className="flex h-[72px] bg-white border-[#f5f5f5] items-center justify-end border-0 border-l-2 border-solid"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1,
        width: "100%",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div>
        <Dropdown menu={{ items: [] }} >
          <Link to={"/settings"}>
            {" "}
            <div className="flex flex-row place-items-center justify-center  gap-2">
              <Avatar size={40} shape="circle" />
              <div className="flex flex-col">
                <p className="text-sm font-medium text-teal">{"name"}</p>
                <p className="text-sm capitalize text-text_primary">{"role"}</p>
              </div>
            </div>
          </Link>
        </Dropdown>
      </div>
    </Header>
  );
}

export default Header;
