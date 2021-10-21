import {
  Modal as ChakraModal,
  ModalOverlay as ChakraModalOverlay,
  ModalContent as ChakraModalContent,
  ModalHeader as ChakraModalHeader,
  ModalFooter as ChakraModalFooter,
  ModalBody as ChakraModalBody,
  ModalCloseButton as ChakraModalCloseButton,
  ModalHeaderProps,
  ModalProps,
  ModalBodyProps,
  ModalFooterProps,
} from "@chakra-ui/react";

export type IModal = ModalProps;

export type IModalHeader = {
  close: boolean;
} & ModalHeaderProps;

export type IModalBody = ModalBodyProps;

export type IModalFooter = ModalFooterProps;

export const Modal = ({
  children,
  isCentered,
  isOpen,
  onClose,
  ...restProps
}: IModal) => {
  return (
    <ChakraModal isCentered isOpen={isOpen} onClose={onClose} {...restProps}>
      <ChakraModalOverlay />
      <ChakraModalContent>{children}</ChakraModalContent>
    </ChakraModal>
  );
};

const Header = ({ children, close, ...restProps }: IModalHeader) => {
  return (
    <>
      <ChakraModalHeader {...restProps}>{children}</ChakraModalHeader>
      {close && <ChakraModalCloseButton />}
    </>
  );
};

const Body = ({ children, ...restProps }: IModalBody) => {
  return <ChakraModalBody {...restProps}>{children}</ChakraModalBody>;
};

const Footer = ({ children, ...restProps }: IModalFooter) => {
  return <ChakraModalFooter {...restProps}>{children}</ChakraModalFooter>;
};

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;

export default Modal;
