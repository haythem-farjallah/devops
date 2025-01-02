import React from "react";

function DevisTopSection({ devis }) {
  return (
    <div>
      <h1 className="text-6xl  font-semibold uppercase">devis </h1>
      <div className="flex w-full justify-between  px-10">
        <div className=" mt-5">
          <h1 className="text-3xl uppercase font-medium">Client</h1>
          <p className="text-base font-normal mt-2">{devis?.user?.name}</p>
          <p className="text-base font-normal mt-2">{devis?.user?.email}</p>
          <p className="text-base font-normal mt-2">{devis?.user?.phone}</p>
        </div>
        <h1 className="text-xl uppercase font-medium">
          nombre de produit :{" "}
          <span className="font-semibold text-blue-gray-400">
            {devis?.cartItems?.length}
          </span>
        </h1>
        <div className=" mt-5">
          <h1 className="text-xl uppercase font-medium">
            Status :{" "}
            <span className="font-semibold text-blue-gray-400">
              {devis?.status === "Pending"
                ? "en attente"
                : devis?.status === "Completed"
                ? "repondu"
                : "commande passé"}
            </span>
          </h1>
          <h1 className="text-xl uppercase font-medium">
            date de creation :{" "}
            <span className="text-gray-600">
              {devis?.createdAt?.slice(0, 10)}
            </span>
          </h1>
          <h1 className="text-xl uppercase font-medium">
            date de modification :{" "}
            <span className="text-gray-600">
              {devis?.createdAt?.slice(0, 10)}
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
}

export default DevisTopSection;
