import React from "react";

function LineTable({ contact, editFun, deleteFun }) {
  return (
    <tr className="bg-white border-b ">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
        {contact?.name?.slice(0, 16)}
        {contact?.name?.length > 16 ? "..." : ""}
      </th>
      <td className="px-6 py-4 truncate w-20  h-10">
        {contact?.email?.slice(0, 16)}{" "}
        {contact?.email?.length > 16 ? "..." : ""}
      </td>
      <td className="px-6 py-4 truncate w-20  h-10">
        {contact?.subject?.slice(0, 16)}{" "}
        {contact?.subject?.length > 16 ? "..." : ""}
      </td>

      <td className="px-6 py-4"> {contact?.createdAt?.slice(0, 10)}</td>
      <td className="px-6 py-4 flex space-x-3">
        <button onClick={editFun}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            // style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"
            style={{ fill: "rgba(0, 0, 0, 0.3)" }}>
            <path d="M20 2H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h3v3.766L13.277 18H20c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zm0 14h-7.277L9 18.234V16H4V4h16v12z"></path>
            <circle cx="15" cy="10" r="2"></circle>
            <circle cx="9" cy="10" r="2"></circle>
          </svg>
        </button>
        <button onClick={deleteFun}>
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
        </button>{" "}
      </td>
    </tr>
  );
}

export default LineTable;
