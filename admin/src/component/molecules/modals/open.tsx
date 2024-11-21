import { ModalFuncProps } from "antd";
import { ModalStaticFunctions } from "antd/es/modal/confirm";
import { cn } from "../../../utils/helper/tailwind-helper";
import { modal } from "../../../hooks/useApp";

export interface ModalOpenProps extends ModalFuncProps {}

export default async function ModalOpen({
  okButtonProps,
  cancelButtonProps,
  className,
  ...props
}: ModalOpenProps): Promise<ReturnType<ModalStaticFunctions["confirm"]>> {
  return modal.confirm({
    icon: null,
    footer: (footer) => {
      return (
        <div className="flex items-center justify-center gap-1">{footer}</div>
      );
    },
    closable: true,
    maskClosable: true,
    style: {
      display: "flex",
      justifyContent: "center",
    },
    okButtonProps: {
      className: cn(
        "text-white h-auto py-2 px-3 font-bold min-w-[100px] shadow-none ms-0 me-0",
        okButtonProps?.className
      ),
      ...okButtonProps,
    },
    className: cn(
      "[&_.ant-modal-content]:!p-10 md:[&_.ant-modal-content]:w-[600px] [&_.ant-modal-confirm-body]:!flex [&_.ant-modal-confirm-body]:!justify-center [&_.ant-modal-confirm-body]:!items-center [&_.ant-modal-confirm-body]:pb-10",
      className
    ),
    cancelButtonProps: {
      className:
        "bg-white text-secondary h-auto py-2 px-3 font-bold min-w-[100px] !ms-0 !me-0",
      ...cancelButtonProps,
    },
    ...props,
  });
}
