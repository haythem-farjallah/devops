import React from "react";

function LineTable({ subCategory, eyeFun, editFun, deleteFun }) {
  return (
    <tr className="bg-primary border-b border-b-gray-400 w-full ">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
        {subCategory?.name?.slice(0, 16)}
        {subCategory?.name?.length > 16 ? "..." : ""}
      </th>

      <td className="px-6 py-4"> {subCategory?.date?.slice(0, 10)}</td>

      <td className="px-6 py-4 flex space-x-3 ">
        <button className="cursor-pointer" onClick={eyeFun}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0"
            y="0"
            viewBox="0 0 64 64"
            xml:space="preserve"
            className="w-6 h-6">
            <g>
              <path
                d="M32 50C19.493 50 9.254 39.17 5.432 34.514c-1.188-1.489-1.188-3.538-.019-5.005C9.254 24.83 19.496 14 32 14c12.51 0 22.747 10.83 26.567 15.486 1.188 1.488 1.189 3.537.021 5.005C54.746 39.17 44.504 50 32 50zm0-32C20.9 18 11.224 28.734 8.523 32.024 11.224 35.266 20.898 46 32 46c11.1 0 20.776-10.734 23.477-14.024C52.776 28.734 43.105 18 32 18z"
                fill="#a0a0a0"
                opacity="1"
                data-original="#000000"></path>
              <path
                d="M32 41c-4.962 0-9-4.037-9-9 0-4.962 4.038-9 9-9 4.963 0 9 4.038 9 9 0 4.963-4.037 9-9 9zm0-14c-2.757 0-5 2.243-5 5s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z"
                fill="#a0a0a0"
                opacity="1"
                data-original="#000000"></path>
            </g>
          </svg>
        </button>
        <button onClick={editFun}>
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
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
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
