import React, { useContext, useEffect, useState } from "react";

import { Formik, Form } from "formik";
import { toast } from "react-hot-toast";
import InputField from "../../components/common/forms/InputField";
import ImageField from "../../components/common/forms/ImageField";
import SelectField from "../../components/common/forms/SelectField";
import { addApi } from "../../api/apiFactory";
import Buttons from "../../components/common/buttons/Buttons";
import { addUpdateIngredientValidation } from "../../utils/validation/validationV/ingredientValidation";
import { ModalContext } from "../../contexts/ModalContext";
// import AddMealModal from "./AddMealModal";
import TextAreaField from "../../components/common/forms/TextAreaField";
import { addUpdateMealValidation } from "../../utils/validation/validationV/MealValidation";
import CalendarSmall from "./CalendarSmall";
import { useGetData } from "../../hooks/apiHooks/useGetData";

function CalendarForm({ refetch }) {
  const { data: dates, refetch: refetchDates } = useGetData(
    "/schedule/fourMondays",
    "fourMondays",
    50
  );

  const [date, setDate] = useState(null);
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
    name: "",
  };

  useEffect(() => {
    if (dates) setDate(dates?.data[0]);
  }, [dates]);

  console.log(dates);

  const handleSubmit = async (values, { resetForm }) => {
    const listMeal = meals
      .filter((item) => item.id !== "0") // Filtrer les objets où id n'est pas "0"
      .map((item) => parseInt(item.id));

    if (listMeal.length < 6) {
      toast.error("Remplire Tous les Plat");
      return;
    }

    const data = { name: values.name, menusId: listMeal, date };

    addApi("/schedule/add", data, {
      token: true,
      formData: false,
    })
      .then(() => {
        toast.success("Successfully created!");
        resetForm();
        refetch();
        refetchDates();
        setMeals([
          { id: "0", name: "" },
          { id: "0", name: "" },
          { id: "0", name: "" },
          { id: "0", name: "" },
          { id: "0", name: "" },
          { id: "0", name: "" },
        ]);
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
              <h2 className="pb-3 text-2xl text-center">Create Calendar</h2>
              <InputField
                id="name"
                name="name"
                type="text"
                label="Nom"
                placeholder="Nom"
              />

              <div className="grid grid-cols-4 gap-4">
                {dates?.data instanceof Array
                  ? dates?.data?.map((d, k) => {
                      if (d == date) {
                        return (
                          <span
                            key={k}
                            className=" bg-red-400 cursor-pointer p-2 text-white text-center font-semibold">
                            {d.slice(0, 10)}
                          </span>
                        );
                      }
                      return (
                        <span
                          key={k}
                          onClick={() => setDate(d)}
                          className=" bg-gray-300 cursor-pointer p-2 text-center font-semibold">
                          {d.slice(0, 10)}
                        </span>
                      );
                    })
                  : []}
              </div>
              {dates?.data?.length == 0 ? (
                <p className=" text-red-400">
                  Toutes les Calendar de ce mois ont déjà été créées.
                </p>
              ) : (
                <></>
              )}

              <CalendarSmall dateA={date} meals={meals} setMeals={setMeals} />
            </div>
            {dates?.data?.length == 0 ? (
              <></>
            ) : (
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
            )}
          </Form>
        </div>
      )}
    </Formik>
  );
}

export default CalendarForm;
