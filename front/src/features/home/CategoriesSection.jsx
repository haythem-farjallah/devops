import React from "react";
import { usePaginatedData } from "../../hooks/apiHooks/useGetData";
import CardCategory from "../category/CardCategory";

function CategoriesSection(props) {
  const { data: categorys } = usePaginatedData(
    20,
    "/categories",
    "getCategory"
  );
  return (
    <div className="container-fluid py-4 ">
      {/* <h2 className="section-title  position-relative text-uppercase mx-xl-5 mb-4">
        <span className="bg-secondary pr-3 ">Featured Products</span>
      </h2> */}
      <div className="grid gap-10 pt-4 grid-cols-1  px-12 md:grid-cols-4 xl:grid-cols-5">
        {categorys &&
          categorys.data.map((category, key) => (
            <CardCategory key={key} category={category} />
          ))}
      </div>
    </div>
  );
}

export default CategoriesSection;
