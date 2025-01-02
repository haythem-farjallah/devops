import React from "react";

function TopMenuDetails({ menu }) {
  return (
    <div className="flex justify-between">
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl text-gray-700 capitalize">
          {" "}
          <span className="font-semibold text-red-400">
            daily menu name :
          </span>{" "}
          {menu.name}
        </h1>{" "}
        <h1 className=" text-gray-700 capitalize">
          {" "}
          <span className="font-semibold text-gray-800">Prix :</span>{" "}
          {menu.prix}
        </h1>{" "}
        <h1 className=" text-gray-700 capitalize">
          {" "}
          <span className="font-semibold text-gray-800">Cout :</span>{" "}
          {menu.cout}
        </h1>
      </div>{" "}
      <div className="flex flex-col space-y-2 pr-10">
        <h1 className=" text-gray-700 capitalize">
          {" "}
          <span className="font-semibold text-gray-800">create at :</span>{" "}
          {menu.createdAt?.slice(0, 10)}
        </h1>{" "}
        <h1 className=" text-gray-700 capitalize">
          {" "}
          <span className="font-semibold text-gray-800">updated at :</span>{" "}
          {menu.updatedAt?.slice(0, 10)}
        </h1>
      </div>
    </div>
  );
}

export default TopMenuDetails;
