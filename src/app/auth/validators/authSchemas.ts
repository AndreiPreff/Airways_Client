import * as yup from "yup";

export const signUpSchema = yup.object().shape({
  first_name: yup.string().required("Required field").min(2, "Min 2 symbols"),
  last_name: yup.string().required("Required field").min(2, "Min 2 symbols"),
  email: yup.string().required("Required field!").email(),
  password: yup
    .string()
    .required("Required field")
    .min(8, "Min 8 symbols")
    .matches(/^[0-9a-zA-Z]{5,}$/, "Password incorrect"),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
});

export const signInSchema = yup.object().shape({
  email: yup.string().required("Required field!").email(),
  password: yup
    .string()
    .required("Required field")
    .min(8, "Min 8 symbols")
    .matches(/^[0-9a-zA-Z]{5,}$/, "Password incorrect"),
});

export const resetSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
});