import { Formik, Form } from "formik";
import InputField from "../../components/common/forms/InputField";
import SelectField from "../../components/common/forms/SelectField";
import Buttons from "../../components/common/buttons/Buttons";
import { useGetData } from "../../hooks/apiHooks/useGetData";
import { useContext, useState } from "react";
import { ModalContext } from "../../contexts/ModalContext";
import toast from "react-hot-toast";

function AddMealModal({ meals, setMeals, pos }) {
  let { handleModal } = useContext(ModalContext);

  const { data: mealsData } = useGetData("/meal/all", "getallMeal", 50);

  console.log(meals);

  const ListIngrednet = mealsData?.data?.content?.map((ing) => {
    return { value: ing.id, label: ing.name };
  });

  let initialValues = {
    meal: "",
  };
  function isIdInList(list, id) {
    return list.some((item) => item.id === id);
  }

  const handleSubmit = async (values, { resetForm }) => {
    console.log(values);

    if (isIdInList(meals, values.meal)) {
      toast.error("plat deja exist");
      return;
    }

    const name = ListIngrednet.filter((ing) => ing.value == values.meal);
    console.log(name);

    meals[pos] = { id: values.meal, name: name[0].label };
    setMeals(meals);
    resetForm();
    handleModal();
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
              <h2 className="pb-3 text-2xl text-center">Add Meal To Menu</h2>

              <SelectField
                id="meal"
                name="meal"
                isMulti={false}
                label="meal"
                placeholder="meal"
                options={ListIngrednet}
              />
            </div>
            <div className="grid grid-cols-2 gap-2  pt-4">
              <Buttons type="reset" variant="outlined" text="Annuler" />
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

export default AddMealModal;
