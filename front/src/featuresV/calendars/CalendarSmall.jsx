import React, { useContext } from "react";
import { ModalContext } from "../../contexts/ModalContext";
import AddMenuModal from "./AddMenuModal";

function CalendarSmall({ meals, dateA, setMeals }) {
  let { handleModal } = useContext(ModalContext);
  console.log(meals);

  const listPos = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return (
    <div className="w-full h-96 flex flex-col ">
      <div className="mt-6 bg-primary    grid grid-cols-6  rounded-2xl">
        {listPos.map((day, p) => {
          const date = new Date(dateA);
          date.setDate(date.getDate() + 1 + p);
          return (
            <div className="w-full h-28 border-2 flex flex-col justify-center items-center text-red-400  font-semibold border-red-400">
              {day}
              <span className="text-sm font-normal text-gray-600">
                {date.getDate() +
                  "-" +
                  (date.getMonth() + 1) +
                  "-" +
                  date.getFullYear()}
              </span>
            </div>
          );
        })}
        {listPos.map((l, p) => {
          if (meals[p]?.id == "0") {
            return (
              <div className={`border-2   h-60   border-red-400  ${l}`}>
                <div className="flex flex-col justify-center h-full items-center capitalize">
                  <div
                    onClick={() =>
                      handleModal(
                        <AddMenuModal
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
            <div className={`border-2   h-60   shad border-red-400   ${l}`}>
              <div className="flex flex-col justify-center  text-red-400 text-2xl h-full items-center capitalize">
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

export default CalendarSmall;
