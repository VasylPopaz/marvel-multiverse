import { useEffect, useState, useCallback, useRef } from "react";

export const useModal = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const modalRef = useRef<HTMLDivElement | null>(null);

  const toggleModal = useCallback(() => {
    setIsOpenModal((prev) => !prev);
  }, []);

  useEffect(() => {
    if (modalRef.current && isOpenModal) {
      modalRef.current.focus();
    }
  }, [isOpenModal]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (isOpenModal && e.code === "Escape") {
        toggleModal();
      }
    };

    if (isOpenModal) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    } else {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    };
  }, [isOpenModal, toggleModal]);

  const handleBackdropClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.currentTarget === e.target) {
      toggleModal();
    }
  };

  return [isOpenModal, toggleModal, handleBackdropClick, modalRef] as const;
};
