import React, { useContext } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useGetSpecificData } from "../../hooks/apiHooks/useGetData";
import DevisTopSection from "../../features/devis/DevisTopSection";
import TableLayout from "../../components/layout/TableLayout";
import ModalDelete from "../../components/common/modal/ModalDelete";
import { ModalContext } from "../../contexts/ModalContext";
import { deleteApi, updateApi } from "../../api/apiFactory";
import toast from "react-hot-toast";
import Buttons from "../../components/common/buttons/Buttons";
import LineTable from "../../features/order/LineTable";
import OrderTopSection from "../../features/order/OrderTopSection";

function ModalOrder({ id }) {
  const { handleModal } = useContext(ModalContext);

  const { data: order, refetch } = useGetSpecificData("/order/", id);

  return (
    <div className="w-[70vw] h-[90vh] overflow-auto ">
      <OrderTopSection order={order?.data} />
      <div className="p-8 flex flex-col">
        <TableLayout
          withPaginate={false}
          columns={[
            "ref",
            "name",
            "category",
            "price",
            "quantity",
            "total",
            "update",
          ]}
          selectPage={() => {}}
          nbPages={1}>
          {order &&
            order?.data?.cartItems?.map((item, key) => {
              return <LineTable key={key} item={item} />;
            })}
        </TableLayout>
        <div className="flex w-full justify-between mt-4">
          <div className="text-sm self-end">
            {" "}
            <h1 className="text-sm  uppercase font-medium">
              Created At :{" "}
              <span className="text-gray-600">
                {order?.data?.createdAt?.slice(0, 10)}
              </span>
            </h1>
            <h1 className="text-sm  uppercase font-medium">
              Updated At :{" "}
              <span className="text-gray-600">
                {order?.data?.createdAt?.slice(0, 10)}
              </span>
            </h1>
          </div>
          <div className="w-1/4 border p-8 flex flex-col space-y-4  bg-gray-200">
            <h2>
              {" "}
              Total price :{" "}
              <span className="">{order?.data.totalOrderPrice} DT</span>
            </h2>
            <h2 className="text-gray-600">
              {" "}
              Shipping Price :{" "}
              <span className="">{order?.data.shippingPrice} DT</span>
            </h2>
            <h2 className="text-gray-600">
              {" "}
              Tax Price : <span className="">{order?.data.taxPrice} DT</span>
            </h2>
            <h2 className="pt-4 border-t border-black">
              {" "}
              Tax Price :{" "}
              <span className="">
                {order?.data.taxPrice +
                  order?.data.shippingPrice +
                  order?.data.totalOrderPrice}{" "}
                DT
              </span>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalOrder;
