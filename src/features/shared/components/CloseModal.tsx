import React from "react";
import useModal from "../hooks/useModal";
import { HiArrowUturnRight } from "react-icons/hi2";

const CloseModal: React.FC = () => {
  const { hideModal } = useModal();
  return (
    <div
      className="flex items-center gap-2 border border-gray-400 rounded py-[2px] px-2 cursor-pointer"
      onClick={hideModal}
    >
      <HiArrowUturnRight className="text-gray-600 transform rotate-180 text-xs" />
      <small className="text-gray-600">Close</small>
    </div>
  );
};

export default CloseModal;
