import React, { useContext, useEffect, useState } from "react";

import { Formik, Form } from "formik";
import { toast } from "react-hot-toast";
import InputField from "../../components/common/forms/InputField";
import ImageField from "../../components/common/forms/ImageField";
import SelectField from "../../components/common/forms/SelectField";
import { updateApi } from "../../api/apiFactory";
import Buttons from "../../components/common/buttons/Buttons";
import { useGetData } from "../../hooks/apiHooks/useGetData";
import TextAreaField from "../../components/common/forms/TextAreaField";
import SelectFieldSimple from "../../components/common/forms/SelectFieldSIMPL";
import { ModalContext } from "../../contexts/ModalContext";
import { addUpdateProductValidation } from "../../utils/validation/productValidation";

function ProductFormUpdate({ refetch, product }) {
  const [restImg, setRestImg] = useState(true);
  const [category, setCategory] = useState(null);
  const [step, setStep] = useState(1);
  let { handleModal } = useContext(ModalContext);

  const [ListSubCategory, setListSubCategory] = useState(null);
  const { data: categorys } = useGetData("/categories", "getallcat", 50);
  const { data: brands } = useGetData("/brand", "getallbrand", 50);
  const { loadMore } = useGetData(
    category ? "/categories/" + category + "/subcategories" : "/subCategory",
    "getallsub",
    50
  );

  const ListCategory = categorys?.data?.map((category) => {
    return { value: category._id, label: category.name };
  });
  const ListBrand = brands?.data?.map((brand) => {
    return { value: brand._id, label: brand.name };
  });
  useEffect(() => {
    loadMore().then((data) => {
      const ListSubCategory = data?.data?.map((subCatrgory) => {
        return { value: subCatrgory._id, label: subCatrgory.name };
      });
      setListSubCategory(ListSubCategory);
    });
  }, [category]);
  console.log(
    product?.subcategories?.data?.map((subcategories) => subcategories._id)
  );
  let initialValues = {
    title: product?.title,
    category: product?.category?._id,
    brand: product?.brand._id,
    subcategories: ListSubCategory
      ? product?.subcategories?.data?.map((subcategories) => subcategories._id)
      : [],
    description: product?.description,
    quantity: product?.quantity,
    price: product?.price,
  };

  const handleSubmit = async (values, { resetForm }) => {
    const { image_1, image_2, image_3, image_4, ...productD } = values;
    updateApi(
      "/product/",
      product?._id,
      {
        ...productD,
        images: image_1,
        images: image_2,
        images: image_3,
        images: image_4,
      },
      {
        token: true,
        formData: true,
      }
    )
      .then(() => {
        toast.success("Successfully updated!");
        resetForm();
        refetch();
        handleModal();
        setRestImg(true);
      })
      .catch((err) => {
        console.log(err);
        if (err.response?.data?.error?.code === 11000) {
          toast.error(type + " exist");
        } else toast.error(err.response?.data?.message);
      });
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      enableReinitialze:true>
      {({ setFieldValue }) => (
        <div className="  w-full  ">
          <Form>
            <div className="flex flex-col gap-5 w-[40vw] h-[68vh] ">
              <h2 className="pb-3 text-2xl">Modification de produit</h2>{" "}
              {step == 1 ? (
                <div className="flex flex-col justify-between">
                  <div className="flex gap-5">
                    <div className="flex flex-col gap-4 w-full">
                      {" "}
                      <InputField
                        id="title"
                        name="title"
                        type="text"
                        label="Titre du produit"
                        placeholder="Titre du produit"
                      />
                      <TextAreaField
                        id="description"
                        name="description"
                        type="text"
                        label="description"
                        placeholder="description"
                      />
                      <SelectField
                        id="brand"
                        name="brand"
                        isMulti={false}
                        label="Marque"
                        placeholder="Marque"
                        options={ListBrand}
                      />
                    </div>{" "}
                    <div className="flex flex-col gap-4 w-full">
                      {" "}
                      <InputField
                        id="price"
                        name="price"
                        type="number"
                        label="prix"
                        placeholder="prix"
                      />
                      <InputField
                        id="quantity"
                        name="quantity"
                        type="number"
                        label="quantité"
                        placeholder="quantité"
                      />
                      <SelectFieldSimple
                        id="category"
                        name="category"
                        isMulti={false}
                        label="categorie"
                        placeholder="categorie"
                        options={ListCategory}
                        setFieldValue={setFieldValue}
                        setCategory={setCategory}
                      />
                      <SelectField
                        id="subcategories"
                        name="subcategories"
                        isMulti={true}
                        label="sous-categorie"
                        placeholder="sous-categorie"
                        options={ListSubCategory}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 justify-end pt-6">
                    <Buttons
                      onClickFun={() => setRestImg(true)}
                      type="reset"
                      variant="outlined"
                      text="annuler"
                    />
                    <Buttons
                      onClickFun={() => setStep(2)}
                      type="button"
                      variant="filled"
                      text="suivant"
                    />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col justify-between h-[60vh]">
                  <ImageField
                    setFieldValue={setFieldValue}
                    name="imageCover"
                    label="image Cover"
                    setRestImg={setRestImg}
                    restImg={restImg}
                  />
                  <div className="flex gap-5">
                    <div className="flex flex-col gap-4 w-full">
                      {" "}
                      <ImageField
                        setFieldValue={setFieldValue}
                        name="image_1"
                        label="image 1"
                        setRestImg={setRestImg}
                        restImg={restImg}
                      />
                      <ImageField
                        setFieldValue={setFieldValue}
                        name="image_2"
                        label="image 2"
                        setRestImg={setRestImg}
                        restImg={restImg}
                      />
                    </div>
                    <div className="flex flex-col gap-4 w-full">
                      <ImageField
                        setFieldValue={setFieldValue}
                        name="image_3"
                        label="image 3"
                        setRestImg={setRestImg}
                        restImg={restImg}
                      />{" "}
                      <ImageField
                        setFieldValue={setFieldValue}
                        name="image_4"
                        label="image 4"
                        setRestImg={setRestImg}
                        restImg={restImg}
                      />{" "}
                    </div>
                  </div>
                  <div className="flex gap-2 justify-end pt-4">
                    <Buttons
                      onClickFun={() => setStep(1)}
                      type="button"
                      variant="outlined"
                      text="prev"
                    />
                    <Buttons
                      onClickFun={() => {}}
                      type="submit"
                      variant="filled"
                      text="enregister"
                    />
                  </div>
                </div>
              )}
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
}

export default ProductFormUpdate;
