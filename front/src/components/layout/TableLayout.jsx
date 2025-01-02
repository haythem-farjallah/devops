import React from "react";
import Pagination from "../common/table/Pagination";
function TableLayout({ columns, children, selectPage, nbPages, withPaginate }) {
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase  dark:text-gray-400">
          <tr className="border-b">
            {columns.map((column) => (
              <th
                key={column}
                scope="col"
                className="px-6 py-3 font-bold capitalize  ">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
      {withPaginate ? (
        <div className="w-full flex justify-end mt-4 pb-4">
          <Pagination selectPage={selectPage} nbPages={nbPages} />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default TableLayout;
