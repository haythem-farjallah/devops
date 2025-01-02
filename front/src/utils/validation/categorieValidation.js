import * as Yup from "yup";
import { imgValidation } from "./imageValidation";

export const addCategorieValidation = Yup.object({
  name: Yup.string().required("name is required").min(3, "Too short name "),
  image: imgValidation,
});

export const updateCategorieValidation = Yup.object({
  name: Yup.string().required("name is required").min(3, "Too short name "),
});
