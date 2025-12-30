import { useAppDispatch, useAppSelector } from "./redux_hook";
import { openModal, closeModal } from "../slice/modal";
// @ts-ignore
import { ReactNode } from "react";

type ModalProps = {
  size?: string | number;
  withCloseButton?: boolean;
  [key: string]: any;
};

const useModal = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.modal);

  const showModal = (content: ReactNode, modalProps: ModalProps) => {
    dispatch(openModal({ content, modalProps }));
  };

  const hideModal = () => {
    dispatch(closeModal());
  };

  return { showModal, hideModal, state };
};

export default useModal;
