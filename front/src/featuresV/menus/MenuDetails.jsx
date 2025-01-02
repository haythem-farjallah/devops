import React from "react";
import TopMenuDetails from "./TopMenuDetails";

function MenuDetails({ menu }) {
  const listMeals = menu?.meals;
  const listPos = [
    "col-span-3 row-span-4",
    "col-span-7 row-span-3",

    "col-span-3 row-span-3 order-1",
    "col-span-4 row-span-3 order-1",
    "col-span-3 row-span-2 order-1",
    "col-span-2 row-span-6 ",
  ];
  return (
    <div className="w-[50vw] h-[70vh] flex flex-col p-4">
      <TopMenuDetails menu={menu} />
      <div className="h-full border border-gray-400 mt-6 bg-gray-300  shadow-2xl grid grid-cols-12 grid-rows-6 p-6 gap-6 rounded-2xl">
        {listPos.map((l, p) => {
          if (p == 5)
            return (
              <div
                className={`border rounded-2xl bg-gray-300 shad border-gray-400 ${l}`}>
                <div className="flex flex-col justify-center h-full items-center  text-red-400 capitalize font-semibold">
                  bagette
                  <span className="text-gray-700">free</span>
                </div>
              </div>
            );
          if (p >= listMeals.length) {
            return (
              <div
                className={`border rounded-2xl bg-gray-300 shad  border-gray-400 ${l}`}>
                <div className="flex flex-col justify-center h-full items-center capitalize">
                  Vide
                </div>
              </div>
            );
          }
          return (
            <div
              className={`border rounded-2xl  bg-gray-300 shad border-gray-400 ${l}`}>
              <div className="flex flex-col justify-center h-full items-center capitalize">
                <h1 className="text-red-400 font-semibold">
                  {listMeals[p].name}
                </h1>
                <h1 className="text-gray-600 font-semibold">
                  {listMeals[p].prix} DT
                </h1>
                <div className="flex gap-2 flex-wrap px-4 justify-center">
                  {listMeals[p].lineIngredient?.map((l) => (
                    <span className="bg-red-400 text-white text-xs p-2 rounded-lg">
                      {l.ingredient.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MenuDetails;
