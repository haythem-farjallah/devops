import React, { useState } from "react";

import { Formik, Form } from "formik";
import { toast } from "react-hot-toast";
import { addCategorieValidation } from "../../utils/validation/categorieValidation";
import InputField from "../../components/common/forms/InputField";
import ImageField from "../../components/common/forms/ImageField";
import { addApi } from "../../api/apiFactory";
import Buttons from "../../components/common/buttons/Buttons";

function CategoryForm({ refetch, type }) {
  const [restImg, setRestImg] = useState(true);

  let initialValues = {
    name: "",
    image: null,
  };

  const handleSubmit = async (values, { resetForm }) => {
    addApi(type == "category" ? "/categories/" : "/brand/", values, {
      token: true,
      formData: true,
    })
      .then(() => {
        toast.success("Successfully created!");
        resetForm();
        refetch();
        setRestImg(true);
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
      validationSchema={addCategorieValidation}
      onSubmit={handleSubmit}
      enableReinitialze:true>
      {({ setFieldValue }) => (
        <div className=" bg-white w-full  p-8  shadow-md">
          <Form>
            <div className="flex flex-col space-y-5">
              <h2 className="pb-3 text-2xl">Create {type}</h2>{" "}
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
                onClickFun={() => setRestImg(true)}
                type="reset"
                variant="outlined"
                text="annuler"
              />
              <Buttons
                onClickFun={() => {}}
                type="submit"
                variant="filled"
                text="enregister"
              />
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
}

export default CategoryForm;
