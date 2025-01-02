import React, { useContext, useState } from "react";

import { Formik, Form } from "formik";
import { toast } from "react-hot-toast";
import InputField from "../../components/common/forms/InputField";
import ImageField from "../../components/common/forms/ImageField";
import SelectField from "../../components/common/forms/SelectField";
import { addApi } from "../../api/apiFactory";
import Buttons from "../../components/common/buttons/Buttons";
import { addUpdateIngredientValidation } from "../../utils/validation/validationV/ingredientValidation";
import { ModalContext } from "../../contexts/ModalContext";
import AddMealModal from "./AddMealModal";
import TextAreaField from "../../components/common/forms/TextAreaField";
import { addUpdateMealValidation } from "../../utils/validation/validationV/MealValidation";

function MealForm({ refetch }) {
  const { handleModal } = useContext(ModalContext);
  const [ingredients, setIngredient] = useState([]);
  let initialValues = {
    name: "",
    description: "",
    prix: "",
  };

  console.log(ingredients);

  const handleSubmit = async (values, { resetForm }) => {
    const listing = ingredients.map((ing) => {
      return {
        idIngrediant: ing.idIngrediant,
        quantity: ing.quantity,
      };
    });
    const data = { ...values, ingredients: listing };

    console.log(listing);

    addApi("/meal/add", data, {
      token: true,
      formData: false,
    })
      .then(() => {
        toast.success("Successfully created!");
        resetForm();
        refetch();
        setIngredient([]);
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
      validationSchema={addUpdateMealValidation}
      onSubmit={handleSubmit}
      enableReinitialze:true>
      {({ setFieldValue }) => (
        <div className=" bg-primary w-full rounded-lg  p-8  shadow-lg border-t-4 border-b-4 border-red-400">
          <Form>
            <div className="flex flex-col space-y-5">
              <h2 className="pb-3 text-2xl text-center">Create Meal</h2>
              <div className="flex gap-4">
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
                  type="number"
                  label="Prix"
                  placeholder="Prix"
                />
              </div>

              <TextAreaField
                id="description"
                name="description"
                type="text"
                label="description"
                placeholder="description"
              />
              {ingredients.length == 0 ? (
                <></>
              ) : (
                <>
                  <h1 className="text-gray-500 text-lg">Ingredients</h1>
                  <div className="flex flex-col border border-gray-400 p-4 ">
                    <div className="grid grid-cols-3 pb-4 text-gray-500">
                      <h1 className="uppercase text-sm font-semibold">Name</h1>
                      <h1 className="uppercase text-sm font-semibold">
                        Quantity
                      </h1>
                      <h1 className="uppercase text-end text-sm font-semibold">
                        Action
                      </h1>
                    </div>
                    {ingredients.map((ing, pos) => (
                      <div
                        key={pos}
                        className="grid grid-cols-3 py-3  border-t border-gray-400 text-gray-500">
                        <h1 className="uppercase text-sm ">{ing.name}</h1>
                        <h1 className="uppercase text-sm ">{ing.quantity}</h1>
                        <div className="flex  justify-end">
                          <button
                            onClick={() => {
                              ingredients.splice(pos, 1);
                              setIngredient([...ingredients]);
                            }}
                            className="text-end">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                              />
                            </svg>
                          </button>{" "}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              <div
                onClick={() =>
                  handleModal(
                    <AddMealModal
                      ingredients={ingredients}
                      setIngredient={setIngredient}
                    />
                  )
                }
                className="p-4 py-5 border border-red-400 rounded-md text-red-400 font-semibold uppercase text-center text-xs cursor-pointer hover:shadow-lg hover:bg-gray-50 duration-150">
                Add Ingredient
              </div>
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

export default MealForm;
