import ReactDOM from "react-dom";

import { Icon } from "../components";

interface ModalProps {
  children: React.ReactNode;
  toggleModal: () => void;
  handleBackdropClick: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
  modalRef: React.RefObject<HTMLDivElement>;
}

const modalRoot = document.querySelector("#modal-root")!;

export const Modal = ({
  children,
  toggleModal,
  handleBackdropClick,
  modalRef,
}: ModalProps) => {
  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0000004d] backdrop-blur-md"
      onClick={(e) => handleBackdropClick(e)}
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        className="relative z-10 max-h-[98dvh] max-w-[335px] rounded-[8px] bg-primaryBgColor px-[20px] py-[40px] md:max-w-[600px] md:px-[32px] md:py-[50px] lg:max-w-[1100px] lg:py-[64px]"
      >
        <button
          type="button"
          onClick={toggleModal}
          className="absolute right-[16px] top-[16px] focus-visible:outline focus-visible:outline-primaryTextColor"
          aria-label="Close modal"
        >
          <Icon
            id="close"
            className="size-[20px] stroke-primaryTextColor md:size-[28px]"
          />
        </button>
        {children}
      </div>
    </div>,
    modalRoot
  );
};
