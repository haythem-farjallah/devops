import * as Yup from "yup";
import { imgValidation } from "./imageValidation";

export const addUpdateProductValidation = Yup.object({
  title: Yup.string().required("name is required").min(3, "Too short name "),
  category: Yup.string().required("category is required"),
  brand: Yup.string().required("brand is required"),
  description: Yup.string().required("description is required"),
  quantity: Yup.number().required("quantity is required"),
  price: Yup.number().required("price is required"),
  imageCover: imgValidation,
  subcategories: Yup.array()
    .of(Yup.string())
    .min(1, "min 1 subcategories ")
    .required("subcategories is required"),
});
