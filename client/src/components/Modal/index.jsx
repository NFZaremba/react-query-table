import React from "react";

import {
  Modal as ChakraModal,
  ModalOverlay as ChakraModalOverlay,
  ModalContent as ChakraModalContent,
  ModalHeader as ChakraModalHeader,
  ModalFooter as ChakraModalFooter,
  ModalBody as ChakraModalBody,
  ModalCloseButton as ChakraModalCloseButton,
} from "@chakra-ui/react";

const Modal = ({ children, ...restProps }) => {
  return (
    <ChakraModal {...restProps}>
      <ChakraModalOverlay />
      <ChakraModalContent>{children}</ChakraModalContent>
    </ChakraModal>
  );
};

const ModalHeader = ({ children, close, ...restProps }) => {
  return (
    <>
      <ChakraModalHeader {...restProps}>{children}</ChakraModalHeader>
      {close && <ChakraModalCloseButton />}
    </>
  );
};

const ModalBody = ({ children, ...restProps }) => {
  return <ChakraModalBody {...restProps}>{children}</ChakraModalBody>;
};

const ModalFooter = ({ children, ...restProps }) => {
  return <ChakraModalFooter {...restProps}>{children}</ChakraModalFooter>;
};

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;
