import { Formik, Form } from "formik";
import InputField from "../../components/common/forms/InputField";
import SelectField from "../../components/common/forms/SelectField";
import Buttons from "../../components/common/buttons/Buttons";
import { useGetData } from "../../hooks/apiHooks/useGetData";
import { useContext, useState } from "react";
import { ModalContext } from "../../contexts/ModalContext";

function AddMealModal({ ingredients, setIngredient }) {
  let { handleModal } = useContext(ModalContext);

  const { data: ingredientsData } = useGetData(
    "/ingredient/all",
    "getallIngredient",
    50
  );

  console.log(ingredients);

  const ListIngrednet = ingredientsData?.data?.content?.map((ing) => {
    return { value: ing.id, label: ing.name };
  });

  let initialValues = {
    idIngrediant: "",
    quantity: "",
  };

  const handleSubmit = async (values, { resetForm }) => {
    console.log(values);

    const name = ListIngrednet.filter(
      (ing) => ing.value == values.idIngrediant
    );
    setIngredient([...ingredients, { ...values, name: name[0].label }]);
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
              <h2 className="pb-3 text-2xl text-center">Add Ingredient</h2>

              <SelectField
                id="idIngrediant"
                name="idIngrediant"
                isMulti={false}
                label="idIngrediant"
                placeholder="idIngrediant"
                options={ListIngrednet}
              />
              <InputField
                id="quantity"
                name="quantity"
                type="number"
                label="quantity"
                placeholder="quantity"
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
