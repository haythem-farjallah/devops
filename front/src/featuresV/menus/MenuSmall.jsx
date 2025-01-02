import React, { useContext } from "react";
import TopMenuDetails from "./TopMenuDetails";
import { ModalContext } from "../../contexts/ModalContext";
import AddMealModal from "./AddMealModal";

function MenuSmall({ meals, setMeals }) {
  let { handleModal } = useContext(ModalContext);
  console.log(meals);

  const listPos = [
    "col-span-3 row-span-4",
    "col-span-7 row-span-3",

    "col-span-3 row-span-3 order-1",
    "col-span-4 row-span-3 order-1",
    "col-span-3 row-span-2 order-1",
    "col-span-2 row-span-6 ",
  ];
  return (
    <div className="w-full h-96 flex flex-col ">
      <div className="h-full border border-gray-400 mt-6 bg-red-300  shadow-2xl grid grid-cols-12 grid-rows-6 p-2 gap-2 rounded-2xl">
        {listPos.map((l, p) => {
          if (p == 5)
            return (
              <div
                className={`border rounded-2xl bg-red-200 shad border-gray-400 ${l}`}>
                <div className="flex flex-col justify-center h-full items-center  text-white capitalize font-semibold">
                  bagette
                  <span className="text-gray-700">free</span>
                </div>
              </div>
            );
          if (meals[p]?.id == "0") {
            return (
              <div
                className={`border rounded-2xl bg-primary shad  border-gray-400 ${l}`}>
                <div className="flex flex-col justify-center h-full items-center capitalize">
                  <div
                    onClick={() =>
                      handleModal(
                        <AddMealModal
                          meals={meals}
                          setMeals={setMeals}
                          pos={p}
                        />
                      )
                    }
                    className=" p-2 text-sm cursor-pointer text-red-400 font-semibold hover:shadow-lg rounded-xl ">
                    Add Meals
                  </div>
                </div>
              </div>
            );
          }
          return (
            <div className={`border rounded-2xl bg-red-200  shad   ${l}`}>
              <div className="flex flex-col justify-center  text-white h-full items-center capitalize">
                {meals[p]?.name}
                <button
                  onClick={() => {
                    meals[p] = { id: "0", name: "" };
                    setMeals(meals);
                  }}>
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
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MenuSmall;
