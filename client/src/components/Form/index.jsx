import React from 'react'
import { FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react'

const Form = ({ children, onSubmit, ...restProps }) => {
  return (
    <form onSubmit={onSubmit} {...restProps}>
      {children}
    </form>
  )
}

const Control = ({ children, ...restProps }) => {
  return <FormControl {...restProps}>{children}</FormControl>
}

const Label = ({ children, ...restProps }) => {
  return <FormLabel {...restProps}>{children}</FormLabel>
}

const ErrorMessage = ({ children, ...restProps }) => {
  return <FormErrorMessage {...restProps}>{children}</FormErrorMessage>
}

Form.Control = Control
Form.Label = Label
Form.ErrorMessage = ErrorMessage

export default Form
