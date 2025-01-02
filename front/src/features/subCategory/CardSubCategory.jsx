import React from "react";
import { Link } from "react-router-dom";

function CardSubCategory({ subCategory }) {
  return (
    <Link
      to={"/products/" + subCategory?._id}
      className="w-full h-52 relative     bg-white shadow-sm rounded flex flex-col justify-end items-center pb-4 duration-200 cursor-pointer hover:scale-[1.1]">
      <img
        className="w-44 bg-gray-400 rounded-xl absolute -top-6  object-cover outline-4 outline-black p-0.5 shadow-md"
        src={"http://localhost:8000/subCategories/" + subCategory.image}
      />
      <h2> {subCategory?.name}</h2>
    </Link>
  );
}

export default CardSubCategory;
