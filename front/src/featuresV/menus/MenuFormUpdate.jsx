import React, { useContext, useEffect, useState } from "react";

import { Formik, Form } from "formik";
import { toast } from "react-hot-toast";
import InputField from "../../components/common/forms/InputField";
import { addApi, updateApi } from "../../api/apiFactory";
import Buttons from "../../components/common/buttons/Buttons";
import { ModalContext } from "../../contexts/ModalContext";

import MenuSmall from "./MenuSmall";
function processList(inputList) {
  while (inputList.length < 5) {
    inputList.push({ id: "0", name: "" });
  }
  return inputList.slice(0, 5);
}

function MenuFormUpdate({ refetch, menu, setMenu }) {
  const { handleModal } = useContext(ModalContext);

  const [meals, setMeals] = useState([
    { id: "0", name: "" },
    { id: "0", name: "" },
    { id: "0", name: "" },
    { id: "0", name: "" },
    { id: "0", name: "" },
  ]);

  useEffect(() => {
    const mealsList = menu?.meals?.map((m) => {
      return { id: m.id, name: m.name };
    });
    setMeals(processList(mealsList));
  }, []);

  let initialValues = {
    name: menu?.name,
  };

  console.log(menu);

  const handleSubmit = async (values, { resetForm }) => {
    const listMeal = meals
      .filter((item) => item.id !== "0") // Filtrer les objets où id n'est pas "0"
      .map((item) => parseInt(item.id));

    if (listMeal.length != 5) {
      toast.error("Remplire Tous les Plat");
      return;
    }

    const data = { name: values.name, mealsId: listMeal };

    updateApi("/menu/", menu?.id, data, {
      token: true,
      formData: false,
    })
      .then(() => {
        toast.success("Successfully updated!");
        resetForm();
        refetch();
        setMeals([
          { id: "0", name: "" },
          { id: "0", name: "" },
          { id: "0", name: "" },
          { id: "0", name: "" },
          { id: "0", name: "" },
        ]);
        setMenu(null);
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
      onSubmit={handleSubmit}
      enableReinitialze:true>
      {({ setFieldValue }) => (
        <div className=" bg-primary w-full rounded-lg  p-8  shadow-lg border-t-4 border-b-4 border-red-400">
          <Form>
            <div className="flex flex-col space-y-5">
              <h2 className="pb-3 text-2xl text-center capitalize">
                update Menu
              </h2>
              <InputField
                id="name"
                name="name"
                type="text"
                label="Nom"
                placeholder="Nom"
              />

              <MenuSmall meals={meals} setMeals={setMeals} />
            </div>
            <div className="grid grid-cols-2 gap-2  pt-4">
              <Buttons
                onClickFun={() => {
                  setMeals([
                    { id: "0", name: "" },
                    { id: "0", name: "" },
                    { id: "0", name: "" },
                    { id: "0", name: "" },
                    { id: "0", name: "" },
                  ]);
                  setMenu(null);
                }}
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

export default MenuFormUpdate;
