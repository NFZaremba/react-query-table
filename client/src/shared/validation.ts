import * as yup from "yup";

export const schema = yup.object().shape({
  first_name: yup.string().required("First Name is required"),
  last_name: yup.string().required("Last Name is required"),
  email: yup
    .string()
    .email("Need to be a valid email")
    .required("Email is required"),
  gender: yup.string().required("Gender is required"),
});
