import * as Yup from "yup";
// import { imgValidation } from "./imageValidation";

export const addUpdateIngredientValidation = Yup.object({
  name: Yup.string().required("name is required").min(3, "Too short name "),
  prix: Yup.number().required("price is required"),
  stock: Yup.number().required("stock is required"),
});
