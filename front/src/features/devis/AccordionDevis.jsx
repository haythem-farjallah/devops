import React from "react";

import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

function AccordionDevis({ open, handleOpen, index, devis }) {
  const columns = ["image", "ref", "Nom", "quantite", "prix"];
  return (
    <Accordion open={open === index} icon={<Icon id={index} open={open} />}>
      <AccordionHeader
        className={`border  ${
          open === index ? " bg-gray-100" : ""
        } focus:outline-none px-4   `}
        onClick={() => handleOpen(index)}>
        <div className="w-[90%]  flex items-center justify-between">
          <div className="  flex items-center justify-start space-x-16 ">
            <div className="text-lg uppercase font-semibold  text-gray-800 ">
              {" "}
              {devis?.user?.name}
            </div>
            <div className=" text-base font-normal  text-gray-600 ">
              {" "}
              {devis?.user?.email}
            </div>
            {/* <span>|</span> */}

            <div className="text-gray-600 text-base font-normal ">
              {devis?.createdAt?.slice(0, 10)}
            </div>
            <div
              className={` ${
                devis?.status === "Pending"
                  ? "text-red-600"
                  : devis?.status === "Completed"
                  ? "text-green-600"
                  : "text-black-600"
              } text-base  tracking-wide font-bold `}>
              {" "}
              {devis?.status === "Pending"
                ? "en attente"
                : devis?.status === "Completed"
                ? "repondu"
                : "commande passé"}
            </div>
          </div>
          <div>
            {" "}
            <div className="text-lg flex items-center uppercase font-semibold  text-gray-800 ">
              prix total:
              <span className="text-base ps-3 text-gray-600">
                {devis?.totalDevisPrice}
              </span>
            </div>
          </div>
        </div>
      </AccordionHeader>
      <AccordionBody
        className={`border  ${open === index ? " bg-gray-100" : ""}  px-4`}>
        <div className={"flex flex-col space-y-4"}>
          <h2></h2>
          <div className="flex ">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
              <thead className="text-xs text-gray-700 uppercase  dark:text-gray-400">
                <tr className="border-b border-gray-500">
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
              <tbody>
                {devis?.cartItems?.map((item) => (
                  <tr
                    key={item?.product?._id}
                    className=" border-b border-gray-500 ">
                    <th scope="row" className="px-6  ">
                      <img
                        className="w-10 rounded-full object-cover border-4 border-black"
                        src={
                          "http://localhost:8000/products/" +
                          item?.product?.imageCover
                        }
                      />
                    </th>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                      {item?.product?._id}
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
                      {item?.quantity}
                    </th>

                    <td className="px-6 py-4 truncate w-20  h-10">
                      {item?.price}{" "}
                    </td>
                  </tr>
                ))}
                <tr className=" ">
                  <th scope="row" className="px-6  "></th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "></th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "></th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "></th>

                  <td className="px-6 py-4   border-b border-gray-500  truncate w-20 font-semibold text-gray-800  h-10">
                    {" "}
                    Prix Total: {devis?.totalDevisPrice}{" "}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex justify-end space-x-4">
            {" "}
            <button className="px-8 mt-4 py-3 uppercase hover:no-underline hover:shadow-lg font-semibold rounded  text-white w-fit self-end bg-gray-600 flex items-center space-x-3">
              <i className="bx bx-trash  mr-2  text-lg"></i>
              Supprimer
            </button>
            <Link
              to={"/admin/devis/" + devis._id}
              className="px-8 mt-4 py-3 uppercase hover:no-underline hover:shadow-lg font-semibold rounded  text-white w-fit self-end bg-black flex items-center space-x-3">
              <i className="bx bx-edit mr-2  text-lg"></i>
              gerer devis
            </Link>
          </div>
        </div>
      </AccordionBody>
    </Accordion>
  );
}

export default AccordionDevis;
