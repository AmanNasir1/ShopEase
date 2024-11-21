import { App } from "antd";
import type { MessageInstance } from "antd/es/message/interface";
import type { ModalStaticFunctions } from "antd/es/modal/confirm";
import type { NotificationInstance } from "antd/es/notification/interface";
import ModalOpen, { ModalOpenProps } from "../component/molecules/modals/open";
import DeleteModal, {
  DeleteModalProps,
} from "../component/molecules/delete-modal";

let message: MessageInstance;
let notification: NotificationInstance;
const modal: ModalInstance = {
  confirm: null,
  info: null,
  success: null,
  error: null,
  warning: null,
  delete: null,
  open: null,
} as unknown as ModalInstance;

interface ModalInstance extends Omit<ModalStaticFunctions, "warn"> {
  delete: (
    config: DeleteModalProps
  ) => Promise<ReturnType<ModalStaticFunctions["confirm"]>>;

  open: (
    config: ModalOpenProps
  ) => Promise<ReturnType<ModalStaticFunctions["confirm"]>>;
}

export default function useApp() {
  const staticFunction = App.useApp();
  message = staticFunction.message;
  notification = staticFunction.notification;
  modal.confirm = staticFunction.modal.confirm;
  modal.info = staticFunction.modal.info;
  modal.success = staticFunction.modal.success;
  modal.error = staticFunction.modal.error;
  modal.warning = staticFunction.modal.warning;
  modal.open = ModalOpen;
  modal.delete = DeleteModal;
  return null;
}

export { message, modal, notification };
