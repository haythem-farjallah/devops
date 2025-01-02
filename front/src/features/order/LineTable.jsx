import React from "react";

function LineTable({ item }) {
  return (
    <tr className="bg-white border-b ">
      <th scope="row" className="px-6  ">
        {item?._id?.slice(0, 16)}
      </th>
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
        {item?.product?.title?.slice(0, 16)}
        {item?.product?.title?.length > 16 ? "..." : ""}
      </th>
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
        {item?.product?.category?.name?.slice(0, 16)}
        {item?.product?.category?.name?.length > 16 ? "..." : ""}
      </th>

      <td className="px-6 py-4 truncate w-20  h-10">{item?.price}</td>
      <td className="px-6 py-4 truncate w-20  h-10">{item?.quantity}</td>
      <td className="px-6 py-4 truncate w-20  h-10">
        {item?.quantity * item?.price}
      </td>
    </tr>
  );
}

export default LineTable;
