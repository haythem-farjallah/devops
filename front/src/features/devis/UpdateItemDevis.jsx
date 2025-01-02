import { Form, Formik } from "formik";
import React, { useContext } from "react";
import InputField from "../../components/common/forms/InputField";
import Buttons from "../../components/common/buttons/Buttons";
import { updateApi } from "../../api/apiFactory";
import toast from "react-hot-toast";
import { ModalContext } from "../../contexts/ModalContext";

function UpdateItemDevis({ item, updateFun, idDevis }) {
  const { handleModal } = useContext(ModalContext);

  let initialValues = {
    quantity: item?.quantity,
    price: item?.price,
  };
  const handleSubmit = async (values, { resetForm }) => {
    updateApi(`/devis/${idDevis}/item/${item?._id}`, "", values, {
      token: true,
      formData: false,
    })
      .then((res) => {
        updateFun();
        resetForm();
        handleModal();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.errors[0].msg);
      });
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      enableReinitialze:true>
      {() => (
        <div className=" w-[20vw]">
          <Form>
            <div className="flex flex-col space-y-4">
              <h2 className=" uppercase text-base ">
                {" "}
                ref de produit :{" "}
                <span className="text-gray-600 font-normal">
                  {item?.product?._id?.slice(0, 10)}
                </span>
              </h2>{" "}
              <h2 className=" uppercase text-base ">
                {" "}
                nom de produit :{" "}
                <span className="text-gray-600 font-normal">
                  {item?.product?.title?.slice(0, 10)}
                </span>
              </h2>{" "}
              <h2 className=" uppercase text-base ">
                {" "}
                prix avant modification :{" "}
                <span className="text-gray-600 font-normal">
                  {item?.price} DT
                </span>
              </h2>{" "}
              <InputField
                id="quantity"
                name="quantity"
                type="number"
                label="quantité"
                placeholder="quantité"
              />
              <InputField
                id="price"
                name="price"
                type="number"
                label="prix"
                placeholder="prix"
              />
              <div className="pt-4">
                <Buttons
                  onClickFun={() => {}}
                  type="submit"
                  variant="filled"
                  text="Enregistrer"
                />
              </div>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
}

export default UpdateItemDevis;
