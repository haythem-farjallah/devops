import * as Yup from "yup";

export const loginValidation = Yup.object({
  password: Yup.string()
    .required("password is required")
    .min(5, "Too short password"),
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
});

export const registerValidation = Yup.object({
  password: Yup.string()
    .required("password is required")
    .min(5, "Too short password "),
  username: Yup.string().required("name is required").min(3, "Too short name "),
  phone: Yup.string().required("phone is required").length(8, "length is 8"),
  codeP: Yup.string().required("codeP is required"),
  university: Yup.string().required("university is required"),
  passwordConfirm: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
});

export const resetCodeValidation = Yup.object({
  resetCode: Yup.string()
    .required("password is required")
    .test("len", "Must be exactly 5 characters", (val) => val.length === 6),
});

export const forgotPasswordValidation = Yup.object({
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
});

export const resetPasswordValidation = Yup.object({
  password: Yup.string()
    .required("password is required")
    .min(5, "Too short password "),
  passwordConfirm: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
});
