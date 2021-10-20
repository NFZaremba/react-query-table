import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormControlProps,
  FormLabelProps,
} from "@chakra-ui/react";
import { IComponentBase } from "../../shared/types";

export type IForm = IComponentBase;

export type IControl = IComponentBase & FormControlProps;
export type ILabel = IComponentBase & FormLabelProps;
export type IErrorMessage = IComponentBase;

const Form = ({ children, ...restProps }: IForm) => {
  return <form {...restProps}>{children}</form>;
};

const Control = ({ children, ...restProps }: IControl) => {
  return <FormControl {...restProps}>{children}</FormControl>;
};

const Label = ({ children, ...restProps }: ILabel) => {
  return <FormLabel {...restProps}>{children}</FormLabel>;
};

const ErrorMessage = ({ children, ...restProps }: IErrorMessage) => {
  return <FormErrorMessage {...restProps}>{children}</FormErrorMessage>;
};

Form.Control = Control;
Form.Label = Label;
Form.ErrorMessage = ErrorMessage;

export default Form;
