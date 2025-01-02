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
// import AddMealModal from "./AddMealModal";
import TextAreaField from "../../components/common/forms/TextAreaField";
import { addUpdateMealValidation } from "../../utils/validation/validationV/MealValidation";
import MenuSmall from "./MenuSmall";

function MenuForm({ refetch }) {
  const { handleModal } = useContext(ModalContext);
  const [meals, setMeals] = useState([
    { id: "0", name: "" },
    { id: "0", name: "" },
    { id: "0", name: "" },
    { id: "0", name: "" },
    { id: "0", name: "" },
  ]);
  let initialValues = {
    name: "",
  };

  const handleSubmit = async (values, { resetForm }) => {
    const listMeal = meals
      .filter((item) => item.id !== "0") // Filtrer les objets où id n'est pas "0"
      .map((item) => parseInt(item.id));

    if (listMeal.length != 5) {
      toast.error("Remplire Tous les Plat");
      return;
    }

    const data = { name: values.name, mealsId: listMeal };

    addApi("/menu/add", data, {
      token: true,
      formData: false,
    })
      .then(() => {
        toast.success("Successfully created!");
        resetForm();
        refetch();
        setMeals([
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
              <h2 className="pb-3 text-2xl text-center">Create Menu</h2>
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

export default MenuForm;
