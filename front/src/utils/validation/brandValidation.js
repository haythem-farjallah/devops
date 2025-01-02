import * as Yup from "yup";
import { imgValidation } from "./imageValidation";

export const addUpdateBrandValidation = Yup.object({
  name: Yup.string().required("name is required").min(3, "Too short name "),
  image: imgValidation,
});
