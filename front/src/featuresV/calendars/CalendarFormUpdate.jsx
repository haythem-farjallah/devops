import React, { useContext, useEffect, useState } from "react";

import { Formik, Form } from "formik";
import { toast } from "react-hot-toast";
import InputField from "../../components/common/forms/InputField";
import ImageField from "../../components/common/forms/ImageField";
import SelectField from "../../components/common/forms/SelectField";
import { addApi, updateApi } from "../../api/apiFactory";
import Buttons from "../../components/common/buttons/Buttons";
import { addUpdateIngredientValidation } from "../../utils/validation/validationV/ingredientValidation";
import { ModalContext } from "../../contexts/ModalContext";
// import AddMealModal from "./AddMealModal";
import TextAreaField from "../../components/common/forms/TextAreaField";
import { addUpdateMealValidation } from "../../utils/validation/validationV/MealValidation";
import CalendarSmall from "./CalendarSmall";
import { useGetData } from "../../hooks/apiHooks/useGetData";

function processList(inputList) {
  while (inputList.length < 6) {
    inputList.push({ id: "0", name: "" });
  }
  return inputList.slice(0, 6);
}

function CalendarFormUpdate({ refetch, calendar, setCalendar }) {
  const { handleModal } = useContext(ModalContext);
  const [meals, setMeals] = useState([
    { id: "0", name: "" },
    { id: "0", name: "" },
    { id: "0", name: "" },
    { id: "0", name: "" },
    { id: "0", name: "" },
    { id: "0", name: "" },
  ]);

  let initialValues = {
    name: calendar?.name,
  };

  useEffect(() => {
    const mealsList = calendar?.menus?.map((m) => {
      return { id: m.id, name: m.name };
    });
    setMeals(processList(mealsList));
  }, []);

  const handleSubmit = async (values, { resetForm }) => {
    const listMeal = meals
      .filter((item) => item.id !== "0") // Filtrer les objets où id n'est pas "0"
      .map((item) => parseInt(item.id));

    if (listMeal.length < 6) {
      toast.error("Remplire Tous les Plat");
      return;
    }

    const data = { name: values.name, menusId: listMeal };

    updateApi("/schedule/", calendar?.id, data, {
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
          { id: "0", name: "" },
        ]);
        setCalendar(null);
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
              <h2 className="pb-3 text-2xl text-center">Update Calendar</h2>
              <InputField
                id="name"
                name="name"
                type="text"
                label="Nom"
                placeholder="Nom"
              />
              <div className=" text-gray-500 text-lg">
                Date :{" "}
                <span className="text-gray-700">
                  {calendar.date.slice(0, 10)}
                </span>
              </div>
              <CalendarSmall
                dateA={calendar?.date}
                meals={meals}
                setMeals={setMeals}
              />
            </div>
            <div className="grid grid-cols-2 gap-2  pt-4">
              <Buttons
                onClickFun={() => {
                  setCalendar(null);
                }}
                type="button"
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

export default CalendarFormUpdate;
