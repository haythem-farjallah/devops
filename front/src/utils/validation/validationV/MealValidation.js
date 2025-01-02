import * as Yup from "yup";
// import { imgValidation } from "./imageValidation";

export const addUpdateMealValidation = Yup.object({
  name: Yup.string().required("name is required").min(3, "Too short name "),
  prix: Yup.number().required("price is required"),
  description: Yup.string().required("description is required"),
});
