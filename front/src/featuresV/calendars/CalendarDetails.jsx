import React from "react";
import TopCalendar from "./TopCalendar";

function CalendarDetails({ calendar }) {
  const listMeals = calendar?.menus;
  const listPos = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return (
    <div className="w-[60vw] h-[60vh] flex flex-col p-4">
      <div className="">
        <span className="font-semibold">Date :</span>{" "}
        {calendar?.date?.slice(0, 10)}
      </div>
      <div className="">
        {" "}
        <span className="font-semibold">Time :</span> 11h35-13h35
      </div>
      <div className=" mt-6 bg-primary    grid grid-cols-6  rounded-2xl">
        {listPos.map((day, p) => {
          const date = new Date(calendar?.date);
          console.log(date.getDate());
          date.setDate(date.getDate() + 1 + p);
          return (
            <div className="w-full h-28 border-2 flex flex-col justify-center items-center text-red-400 text-xl font-semibold border-red-400">
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
          if (p >= listMeals?.length) {
            return (
              <div className={`border-2   h-72  shad border-red-400 ${l}`}>
                <div className="flex flex-col justify-center h-full items-center capitalize">
                  Vide
                </div>
              </div>
            );
          }
          return (
            <div className={`border-2   h-72  shad border-red-400 ${l}`}>
              <div className="flex flex-col justify-center h-full items-center capitalize">
                <h1 className="text-red-400 font-semibold">
                  {listMeals[p]?.name}
                </h1>
                <h1 className="text-gray-600 font-semibold">
                  {listMeals[p]?.prix} DT
                </h1>
                <div className="flex gap-2 flex-wrap px-4 justify-center">
                  {listMeals[p]?.meals?.map((l) => (
                    <span className="bg-red-400 text-white text-xs p-2 rounded-lg">
                      {l?.name}
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

export default CalendarDetails;
