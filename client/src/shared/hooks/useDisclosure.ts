import { useCallback, useState } from "react";

export type DisclosureProps = {
  isOpen?: boolean;
  onClose?(): void;
  onOpen?(): void;
};

export const useDisclosure = (props: DisclosureProps = {}) => {
  const {
    isOpen: isOpenProp,
    onClose: onCloseProp,
    onOpen: onOpenProp,
  } = props;
  const [isOpen, setIsOpen] = useState(isOpenProp || false);

  const onOpen = useCallback(() => {
    setIsOpen(true);
    onOpenProp?.();
  }, [onOpenProp]);
  const onClose = useCallback(() => {
    setIsOpen(false);
    onCloseProp?.();
  }, [onCloseProp]);

  return { isOpen, onOpen, onClose };
};
