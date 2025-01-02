import * as Yup from "yup";
import { imgValidation } from "./imageValidation";

export const addUpdateSubCategorieValidation = Yup.object({
  name: Yup.string().required("name is required").min(3, "Too short name "),
  category: Yup.string().required("category is required"),
  image: imgValidation,
});

// categories: Yup.array()
//     .of(Yup.string())
//     .min(1, "message")
//     .matches(/([A-Za-z]+( [A-Za-z]+)+)/i, "message")
//     .required("message"),
