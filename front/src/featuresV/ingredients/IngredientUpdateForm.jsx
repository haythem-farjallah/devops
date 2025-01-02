import React, { useState } from "react";

import { Formik, Form } from "formik";
import { toast } from "react-hot-toast";
import InputField from "../../components/common/forms/InputField";
import ImageField from "../../components/common/forms/ImageField";
import SelectField from "../../components/common/forms/SelectField";
import { addApi, updateApi } from "../../api/apiFactory";
import Buttons from "../../components/common/buttons/Buttons";
import { addUpdateIngredientValidation } from "../../utils/validation/validationV/ingredientValidation";

function IngredientUpdateForm({ ingredient, setIngredient, refetch }) {
  let initialValues = {
    name: ingredient?.name,
    prix: ingredient?.prix,
    stock: ingredient?.stock,
    unitPrice: ingredient?.unitPrice,
  };

  const handleSubmit = async (values, { resetForm }) => {
    updateApi("/ingredient/", ingredient?.id, values, {
      token: true,
      formData: false,
    })
      .then(() => {
        toast.success("Successfully updated!");
        resetForm();
        refetch();
        setIngredient(null);
      })
      .catch((err) => {
        if (err.response?.data?.error?.code === 11000) {
          toast.error(type + " exist");
        } else toast.error(err.response.data?.message);
      });
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={addUpdateIngredientValidation}
      onSubmit={handleSubmit}
      enableReinitialze:true>
      {({ setFieldValue }) => (
        <div className=" bg-primary w-full rounded-lg  p-8  shadow-lg border-t-4 border-b-4 border-red-400">
          <Form>
            <div className="flex flex-col space-y-5">
              <h2 className="pb-3 text-2xl text-center">Update Ingredient</h2>{" "}
              <InputField
                id="name"
                name="name"
                type="text"
                label="Nom"
                placeholder="Nom"
              />
              <InputField
                id="prix"
                name="prix"
                type="text"
                label="Prix"
                placeholder="prix"
              />
              <InputField
                id="stock"
                name="stock"
                type="text"
                label="Stock"
                placeholder="Stock"
              />
              <SelectField
                id="unitPrice"
                name="unitPrice"
                isMulti={false}
                label="Unit Price"
                placeholder="Unit Price"
                options={[
                  { value: "KG", label: "KG" },
                  { value: "G", label: "G" },
                ]}
              />
            </div>
            <div className="grid grid-cols-2 gap-2  pt-4">
              <Buttons
                onClickFun={() => setRestImg(true)}
                type="reset"
                variant="outlined"
                text="Annuler"
              />
              <Buttons
                onClickFun={() => {}}
                type="submit"
                variant="filled"
                text="enregistrer"
              />
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
}

export default IngredientUpdateForm;
