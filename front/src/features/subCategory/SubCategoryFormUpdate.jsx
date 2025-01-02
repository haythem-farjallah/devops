import React, { useState } from "react";

import { Formik, Form } from "formik";
import { toast } from "react-hot-toast";
import { updateCategorieValidation } from "../../utils/validation/categorieValidation";
import InputField from "../../components/common/forms/InputField";
import ImageField from "../../components/common/forms/ImageField";
import { updateApi } from "../../api/apiFactory";
import Buttons from "../../components/common/buttons/Buttons";
import SelectField from "../../components/common/forms/SelectField";
import { useGetData } from "../../hooks/apiHooks/useGetData";

function SubCategoryFormUpdate({ subCategory, setSubCategory, refetch }) {
  const [restImg, setRestImg] = useState(true);

  const { data: categorys } = useGetData("/categories", "getall", 50);
  const ListCategory = categorys?.data?.map((category) => {
    return { value: category._id, label: category.name };
  });
  let initialValues = {
    name: subCategory?.name,
    image: null,
    category: null,
  };

  const handleSubmit = async (values, { resetForm }) => {
    updateApi("/subCategory/", subCategory?._id, values, {
      token: true,
      formData: true,
    })
      .then(() => {
        toast.success("Successfully created!");
        resetForm();
        setSubCategory(null);
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
      onSubmit={handleSubmit}
      enableReinitialze:true>
      {({ setFieldValue, submitForm }) => (
        <div className=" bg-white w-full  p-8  shadow-md">
          <Form>
            <div className="flex flex-col space-y-5">
              {" "}
              <h2 className="pb-3 text-2xl">Update Sub Category</h2>{" "}
              <ImageField
                setFieldValue={setFieldValue}
                name="image"
                label="image"
                setRestImg={setRestImg}
                restImg={restImg}
              />
              <InputField
                id="name"
                name="name"
                type="text"
                label="Nom"
                placeholder="Nom"
              />
              <SelectField
                id="category"
                name="category"
                isMulti={false}
                label="categorie"
                placeholder="categorie"
                options={ListCategory}
              />
            </div>

            <div className="flex gap-2 justify-end pt-4">
              <Buttons
                onClickFun={() => {
                  setRestImg(true);
                  setSubCategory(null);
                }}
                type="reset"
                variant="outlined"
                text="Annuler"
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

export default SubCategoryFormUpdate;
