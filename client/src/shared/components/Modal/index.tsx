import { motion } from "framer-motion";
import { createContext, useContext, useEffect, useMemo } from "react";
import { Spinner } from "..";
import { modalMotion } from "../../animation";
import { IComponentBase } from "../../types";

export type IModal = {
  onClose: () => void;
  isOpen: boolean;
} & IComponentBase;

export type IModalHeader = IComponentBase;

export type IModalBody = IComponentBase;

export type IModalFooter = {
  action: {
    type: "delete" | "submit";
    text: string;
    onClick: () => void;
    isLoading: boolean;
  };
};

export type IModalContext = { onClose: () => void };

const ModalContext = createContext<IModalContext | undefined>(undefined);

const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("Modal components cannot be rendered outside of Modal");
  }
  return context;
};

export const Modal = ({ children, isOpen, onClose }: IModal) => {
  const value = useMemo(
    () => ({
      onClose,
    }),
    [onClose]
  );

  useEffect(() => {
    const closeModal = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", closeModal);
    return () => window.removeEventListener("keydown", closeModal);
  }, [onClose]);

  return (
    <>
      {isOpen ? (
        <ModalContext.Provider value={value}>
          <div
            className="fixed inset-0 z-10 overflow-y-auto"
            id="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal header"
            aria-label="modal"
          >
            <div className="min-h-screen px-4 text-center">
              <div
                className="opacity-25 fixed inset-0 z-40 bg-black"
                aria-hidden="true"
                onClick={onClose}
              />
              <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
              />
              <motion.div
                variants={modalMotion}
                initial="hidden"
                animate="show"
                className="relative inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle bg-white shadow-xl rounded-2xl z-50"
              >
                {children}
              </motion.div>
            </div>
          </div>
        </ModalContext.Provider>
      ) : null}
    </>
  );
};

const Header = ({ children, ...restProps }: IModalHeader) => {
  return (
    <div
      className="flex items-start justify-between rounded-t mb-8"
      {...restProps}
    >
      <h3
        className="text-lg font-medium leading-6 text-gray-900"
        id="modal header"
      >
        {children}
      </h3>
    </div>
  );
};

const Body = ({ children, ...restProps }: IModalBody) => {
  return (
    <div className="mt-2" {...restProps}>
      {children}
    </div>
  );
};

const Footer = ({ action, ...restProps }: IModalFooter) => {
  const { onClose } = useModalContext();
  return (
    <div className="mt-8" {...restProps}>
      <button
        type="button"
        className={`inline-flex justify-center px-4 py-2 text-sm font-medium text-green-900  border-transparent rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2  mr-4 ${
          action.type === "submit"
            ? "bg-green-100 border hover:bg-green-200 focus-visible:ring-green-500"
            : ""
        }${
          action.type === "delete"
            ? "bg-red-100 border hover:bg-red-200 focus-visible:ring-red-500"
            : ""
        }`}
        tabIndex={0}
        onClick={action.onClick}
        disabled={action.isLoading}
      >
        {action.isLoading && <Spinner />}
        {action.text}
      </button>
      <button
        type="button"
        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-900 bg-gray-100 border border-transparent rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500"
        tabIndex={0}
        onClick={onClose}
      >
        Cancel
      </button>
    </div>
  );
};

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;

export default Modal;
