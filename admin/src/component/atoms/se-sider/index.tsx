import Sider, { SiderProps } from "antd/es/layout/Sider";
import { forwardRef } from "react";

export interface SESiderProps extends SiderProps {}

const SESider = forwardRef<HTMLDivElement, SESiderProps>((props, ref) => {
  const { children, ...rest } = props;
  return (
    <Sider {...rest} ref={ref}>
      {children}
    </Sider>
  );
});

export default SESider;
