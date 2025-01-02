import React, { useContext } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useGetSpecificData } from "../../hooks/apiHooks/useGetData";
import DevisTopSection from "../../features/devis/DevisTopSection";
import TableLayout from "../../components/layout/TableLayout";
import LineTable from "../../features/order/LineTable";
import ModalDelete from "../../components/common/modal/ModalDelete";
import { ModalContext } from "../../contexts/ModalContext";
import { addApi, deleteApi, updateApi } from "../../api/apiFactory";
import toast from "react-hot-toast";
import UpdateItemDevis from "../../features/devis/UpdateItemDevis";
import Buttons from "../../components/common/buttons/Buttons";

function ModalDevis({ id }) {
  const { handleModal } = useContext(ModalContext);
  const navigate = useNavigate();

  const { data: devis } = useGetSpecificData("/devis/", id);

  const complitedDevisFun = async () => {
    handleModal();
    navigate("/checkout/" + id);
  };

  return (
    <div className="w-[70vw] h-[90vh] overflow-auto">
      <DevisTopSection devis={devis?.data} />
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
          {devis &&
            devis?.data?.cartItems?.map((item, key) => {
              return <LineTable key={key} item={item} />;
            })}
        </TableLayout>
        <div className="flex w-full justify-end mt-4">
          <div className="w-1/4 border p-8 flex flex-col space-y-4  bg-gray-200">
            <h2>
              {" "}
              Total price :{" "}
              <span className="">{devis?.data.totalDevisPrice} DT</span>
            </h2>
            <h2 className="text-gray-600">
              {" "}
              Shipping Price :{" "}
              <span className="">{devis?.data.shippingPrice} DT</span>
            </h2>
            <h2 className="text-gray-600">
              {" "}
              Tax Price : <span className="">{devis?.data.taxPrice} DT</span>
            </h2>
            <h2 className="pt-4 border-t border-black">
              {" "}
              Tax Price :{" "}
              <span className="">
                {devis?.data.taxPrice +
                  devis?.data.shippingPrice +
                  devis?.data.totalDevisPrice}{" "}
                DT
              </span>
            </h2>
          </div>
        </div>
        <div className="self-end flex space-x-3">
          <div className="self-end w-48 pt-4">
            {devis?.data?.status === "Completed" ? (
              <Buttons
                onClickFun={() => {
                  complitedDevisFun();
                }}
                type="button"
                variant="filled"
                text="Checkout"
              />
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalDevis;
