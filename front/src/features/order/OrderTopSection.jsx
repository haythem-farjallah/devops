import React from "react";

function OrderTopSection({ order }) {
  return (
    <div>
      <h1 className="text-6xl  font-semibold uppercase"> Commande </h1>
      <div className="flex w-full justify-between  px-10">
        <div className=" mt-5">
          <h1 className="text-3xl uppercase font-medium">Client</h1>
          <p className="text-base font-normal mt-2">{order?.user?.name}</p>
          <p className="text-base font-normal mt-2">{order?.user?.email}</p>
          <p className="text-base font-normal mt-2">{order?.user?.phone}</p>
          <div
            className={`w-fit mt-2 ${
              order?.isPaid ? "bg-orange-300" : "bg-red-300"
            } text-base  tracking-wide font-medium text-white p-2 rounded-xl `}>
            {" "}
            {order?.isPaid
              ? "Payé en :" + order?.paidAt?.slice(0, 10)
              : "N'est pas payé"}
          </div>
          <div
            className={`w-fit mt-2 ${
              order?.isDelivered ? "bg-purple-200" : "bg-red-300"
            } text-base  tracking-wide font-medium text-white p-2 rounded-xl `}>
            {" "}
            {order?.isDelivered
              ? "Livré en :" + order?.deliveredAt?.slice(0, 10)
              : "En cours"}
          </div>
        </div>
        <h1 className="text-xl uppercase font-medium">
          nombre de produit :{" "}
          <span className="font-semibold text-blue-gray-400">
            {order?.cartItems?.length}
          </span>
        </h1>
        <div className=" w-1/4 mt-5">
          <div className="  border p-4 ">
            <h2 className="text-xl uppercase">Adress :</h2>
            <div className="text-sm flex pt-2 items-center uppercase font-semibold  text-gray-800 ">
              ville :
              <span className="text-sm ps-3 capitalize text-gray-600">
                {order?.shippingAddress?.city}
              </span>
            </div>
            <div className="text-sm flex pt-2 items-center uppercase font-semibold  text-gray-800 ">
              postal Code :
              <span className="text-sm ps-3 capitalize text-gray-600">
                {order?.shippingAddress?.postalCode}
              </span>
            </div>
            <div className="text-sm flex pt-2 items-center uppercase font-semibold  text-gray-800 ">
              telephone :
              <span className="text-sm ps-3 capitalize text-gray-600">
                {order?.shippingAddress?.phone}
              </span>
            </div>
            <div className="text-sm flex pt-2 items-center uppercase font-semibold  text-gray-800 ">
              details :
              <span className="text-sm ps-3 capitalize text-gray-600">
                {order?.shippingAddress?.details}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderTopSection;
