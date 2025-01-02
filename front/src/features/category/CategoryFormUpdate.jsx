import React, { useState } from "react";

import { Formik, Form } from "formik";
import { toast } from "react-hot-toast";
import { updateCategorieValidation } from "../../utils/validation/categorieValidation";
import InputField from "../../components/common/forms/InputField";
import ImageField from "../../components/common/forms/ImageField";
import { updateApi } from "../../api/apiFactory";
import Buttons from "../../components/common/buttons/Buttons";

function CategoryFormUpdate({ category, setCategory, refetch, type }) {
  const [restImg, setRestImg] = useState(true);
  let initialValues = {
    name: category?.name,
    image: category?.image || null,
  };

  const handleSubmit = async (values, { resetForm }) => {
    updateApi(
      type == "category" ? "/categories/" : "/brand/",
      category?._id,
      values,
      {
        token: true,
        formData: true,
      }
    )
      .then(() => {
        toast.success("Successfully created!");
        resetForm();
        setCategory(null);
        refetch();
      })
      .catch((err) => {
        if (err.response?.data?.error?.code === 11000) {
          toast.error("category exist");
        } else toast.error(err.response.data?.message);
      });
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={updateCategorieValidation}
      onSubmit={handleSubmit}
      enableReinitialze:true>
      {({ setFieldValue, submitForm }) => (
        <div className=" bg-white w-full  p-8  shadow-md">
          <Form>
            <div className="flex flex-col space-y-5">
              {" "}
              <h2 className="pb-3 text-2xl">Modification du {type}</h2>{" "}
              <InputField
                id="name"
                name="name"
                type="text"
                label="Nom"
                placeholder="Nom"
              />
              <ImageField
                setFieldValue={setFieldValue}
                name="image"
                label="image"
                setRestImg={setRestImg}
                restImg={restImg}
              />
            </div>

            <div className="flex gap-2 justify-end pt-4">
              <Buttons
                onClickFun={() => {
                  setRestImg(true);
                  setCategory(null);
                }}
                type="reset"
                variant="outlined"
                text="annuler"
              />
              <Buttons
                onClickFun={() => {
                  submitForm();
                }}
                type="submit"
                variant="filled"
                text="modifier"
              />
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
}

export default CategoryFormUpdate;
