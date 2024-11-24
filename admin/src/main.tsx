import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ConfigProvider } from "antd";
import { App as AntdApp } from "antd";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        components: {
          Form: {
            itemMarginBottom: 0,
          },
        },

        token: {
          colorPrimary: "#000000",
        },
      }}
    >
      <AntdApp className="h-full">
        <App />
      </AntdApp>
    </ConfigProvider>
  </StrictMode>
);
