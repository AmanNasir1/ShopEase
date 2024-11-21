import { ModalFuncProps } from "antd";
import { ModalStaticFunctions } from "antd/es/modal/confirm";
import { modal } from "../../../hooks/useApp";
import { DeleteIcon } from "../../../assets/svgs/icons";

export interface DeleteModalProps extends ModalFuncProps {
  heading?: string;
  description?: string;
}

export default async function DeleteModal({
  heading,
  content,
  description,
  okButtonProps,
  cancelButtonProps,
  centered,
  ...props
}: DeleteModalProps): Promise<ReturnType<ModalStaticFunctions["confirm"]>> {
  return modal.confirm({
    icon: null,
    content: description ? (
      <div className="flex w-full flex-1 flex-col items-center justify-center gap-5 pt-4">
        <DeleteIcon className="size-12 text-cinnabar" />
        <p className="text-lg font-semibold text-black">
          {heading || "Delete"}
        </p>
        <p className="text-sm text-secondary">{description}</p>
      </div>
    ) : (
      content
    ),
    centered: centered,
    footer: (footer) => {
      return (
        <div className="flex items-center justify-center gap-1">{footer}</div>
      );
    },
    closable: true,
    maskClosable: true,
    okText: "Delete",
    style: !centered
      ? {
          display: "flex",
          justifyContent: "center",
        }
      : undefined,
    okButtonProps: {
      className:
        "bg-cinnabar text-white h-auto py-2 px-3 font-bold min-w-[100px] hover:!bg-red-700 ms-0 me-0",
      ...okButtonProps,
    },
    className:
      "[&_.ant-modal-content]:!p-10 md:[&_.ant-modal-content]:w-[600px] [&_.ant-modal-confirm-body]:!flex [&_.ant-modal-confirm-body]:!justify-center [&_.ant-modal-confirm-body]:!items-center [&_.ant-modal-confirm-body]:pb-10",
    cancelButtonProps: {
      className:
        "bg-white text-secondary h-auto py-2 px-3 font-bold min-w-[100px] !ms-0 !me-0",
      ...cancelButtonProps,
    },
    ...props,
  });
}
