import * as Yup from "yup";

export const contactValidation = Yup.object({
  message: Yup.string()
    .required("message is required")
    .min(6, "Too short message"),
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  name: Yup.string().required("name is required"),
  subject: Yup.string().required("subject is required"),
  phone: Yup.string().required("phone is required"),
});
