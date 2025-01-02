import React, { useState, useContext } from "react";
import TableLayout from "../../components/layout/TableLayout";
import { usePaginatedData } from "../../hooks/apiHooks/useGetData";

import LineTable from "../../featuresV/ingredients/LineTable";
import { deleteApi } from "../../api/apiFactory";
import toast from "react-hot-toast";

import ModalDelete from "../../components/common/modal/ModalDelete";
import { ModalContext } from "../../contexts/ModalContext";
import Empty from "../../components/common/all/Empty";
import IngredientForm from "../../featuresV/ingredients/IngredientForm";
import IngredientUpdateForm from "../../featuresV/ingredients/IngredientUpdateForm";
function IngredientPage() {
  const { handleModal } = useContext(ModalContext);
  const [ingredient, setIngredient] = useState(null);
  const {
    data: ingredients,
    selectPage,
    refetch,
  } = usePaginatedData(8, "/ingredient/all", "ingredients");

  console.log(ingredients);

  const updateIngredientFun = (ingredient) => {
    setIngredient(ingredient);
  };
  const deleteIngredientFun = async (id) => {
    deleteApi("/ingredient/", id, {
      token: true,
      formData: false,
    })
      .then((res) => {
        toast.success("Successfully deleted!");
        refetch();
      })
      .catch((err) => {
        toast.error(err.response.data.errors[0].msg);
      });
  };
  return (
    <div className="flex gap-6   ">
      <div className="w-1/4  ">
        <div className="w-full h-20 text-white font-semibold bg-red-400 shadow-lg mb-4 flex justify-center items-center rounded-md text-3xl">
          Ingredients{" "}
        </div>
        {ingredient ? (
          <IngredientUpdateForm
            ingredient={ingredient}
            setIngredient={setIngredient}
            refetch={() => refetch()}
          />
        ) : (
          <IngredientForm refetch={() => refetch()} />
        )}
      </div>
      <div className="w-3/4">
        <div className=" bg-primary   p-8 pb-0 shadow-lg rounded-lg  border-t-4 border-b-4 border-red-400">
          <p className="text-gray-500 capitalize -mt-4 text-end">
            {" "}
            total ingredient : {ingredients?.data.totalElements}
          </p>
          {ingredients && ingredients.data.length == 0 ? (
            <Empty />
          ) : (
            <TableLayout
              withPaginate={true}
              columns={[
                "nom",
                "prix",
                "stock",
                "unitPrice",
                "date de creation",
                "action",
              ]}
              selectPage={selectPage}
              nbPages={ingredients?.data.totalPages}>
              {ingredients &&
                ingredients.data.content.map((ingredient, key) => {
                  return (
                    <LineTable
                      key={key}
                      subCategory={ingredient}
                      editFun={() => updateIngredientFun(ingredient)}
                      deleteFun={() =>
                        handleModal(
                          <ModalDelete
                            deleteFun={() => deleteIngredientFun(ingredient.id)}
                          />
                        )
                      }
                    />
                  );
                })}
            </TableLayout>
          )}
        </div>
      </div>
    </div>
  );
}

export default IngredientPage;
